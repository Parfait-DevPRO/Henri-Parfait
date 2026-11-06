require('dotenv').config({ path: require('node:path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const b2KeyId = process.env.B2_KEY_ID || process.env.ID;
const b2ApplicationKey = process.env.B2_APPLICATION_KEY || process.env.APPLICATION_KEY;
const b2BucketName = process.env.B2_BUCKET_NAME || process.env.BUCKET_NAME;
const downloadProjects = {
  'tilapia_farm': {
    objectName: process.env.B2_OBJECT_TILAPIA_FARM || 'Tilapia_farm.apk',
    filename: 'Tilapia_farm.apk'
  },
  'Reseau_Social_Universitaire': {
    objectName: process.env.B2_OBJECT_RESEAU_SOCIAL || 'Reseau_Social.apk',
    filename: 'Reseau_Social.apk'
  },
  'gestion-paie': {
    objectName: process.env.B2_OBJECT_GESTION_PAIE || 'Société_Paie.zip',
    filename: 'Société_Paie.zip'
  }
};
let b2Authorization;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '200kb' }));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 12 });
app.use('/api/', limiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

async function authorizeBackblaze() {
  if (b2Authorization && b2Authorization.expiresAt > Date.now()) {
    return b2Authorization;
  }

  const credentials = Buffer.from(`${b2KeyId}:${b2ApplicationKey}`).toString('base64');
  const response = await fetch('https://api.backblazeb2.com/b2api/v3/b2_authorize_account', {
    headers: { Authorization: `Basic ${credentials}` }
  });

  if (!response.ok) {
    console.error('Backblaze authorization failed:', response.status);
    throw new Error('Backblaze authorization failed.');
  }

  const data = await response.json();
  if (!data.apiInfo?.storageApi?.downloadUrl || !data.authorizationToken) {
    throw new Error('Backblaze authorization response is incomplete.');
  }

  b2Authorization = {
    downloadUrl: data.apiInfo.storageApi.downloadUrl,
    authorizationToken: data.authorizationToken,
    expiresAt: Date.now() + 23 * 60 * 60 * 1000
  };
  return b2Authorization;
}

app.get('/api/download/:projectId', async (req, res) => {
  const project = downloadProjects[req.params.projectId];
  if (!project) {
    return res.status(404).json({ error: 'Projet introuvable.' });
  }
  if (!project.objectName) {
    return res.status(404).type('text').send('404 Not Found');
  }

  const missingConfig = [
    !b2KeyId && 'ID (ou B2_KEY_ID)',
    !b2ApplicationKey && 'APPLICATION_KEY (ou B2_APPLICATION_KEY)',
    !b2BucketName && 'BUCKET_NAME (ou B2_BUCKET_NAME)'
  ].filter(Boolean);
  if (missingConfig.length) {
    console.error('Configuration Backblaze manquante:', missingConfig.join(', '));
    return res.status(503).json({ error: 'Téléchargement temporairement indisponible.' });
  }

  try {
    const auth = await authorizeBackblaze();
    const encodedObjectName = project.objectName
      .split('/')
      .map(encodeURIComponent)
      .join('/');
    const downloadUrl = `${auth.downloadUrl}/file/${encodeURIComponent(b2BucketName)}/${encodedObjectName}`;
    const requestHeaders = { Authorization: auth.authorizationToken };
    if (req.headers.range) requestHeaders.Range = req.headers.range;
    const fileResponse = await fetch(downloadUrl, { headers: requestHeaders });

    if (!fileResponse.ok) {
      if (fileResponse.status === 404) {
        return res.status(404).json({ error: 'Fichier de test introuvable dans Backblaze.' });
      }
      console.error('Backblaze download failed:', fileResponse.status);
      return res.status(502).json({ error: 'Impossible de récupérer le fichier de test.' });
    }

    res.status(fileResponse.status);
    res.setHeader('Content-Type', fileResponse.headers.get('content-type') || 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${project.filename}"`);
    const contentRange = fileResponse.headers.get('content-range');
    if (contentRange) res.setHeader('Content-Range', contentRange);
    const acceptRanges = fileResponse.headers.get('accept-ranges');
    if (acceptRanges) res.setHeader('Accept-Ranges', acceptRanges);
    const contentLength = fileResponse.headers.get('content-length');
    if (contentLength) res.setHeader('Content-Length', contentLength);

    if (!fileResponse.body) {
      return res.status(502).json({ error: 'Réponse de téléchargement vide.' });
    }

    const { Readable } = require('node:stream');
    Readable.fromWeb(fileResponse.body).on('error', (error) => {
      console.error('Backblaze file stream failed:', error.message);
      if (!res.headersSent) {
        res.status(502).json({ error: 'Erreur pendant le téléchargement.' });
      } else {
        res.destroy(error);
      }
    }).pipe(res);
  } catch (error) {
    console.error('Erreur téléchargement Backblaze:', error.message);
    if (!res.headersSent) {
      return res.status(502).json({ error: 'Erreur serveur pendant le téléchargement.' });
    }
  }
});

app.post('/api/contact', async (req, res) => {
  const { nom, email, sujet, message } = req.body || {};
  if (!nom || !email || !sujet || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }
  const emailRe = /^\S+@\S+\.\S+$/;
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Email invalide.' });
  }

  const missingBrevo = ['CLE_API', 'FROM_EMAIL', 'TO_EMAIL']
    .filter((key) => !process.env[key]);
  if (missingBrevo.length) {
    return res.status(500).json({
      error: `Configuration Brevo manquante: ${missingBrevo.join(', ')}.`
    });
  }

  try {
    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.CLE_API,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { email: process.env.FROM_EMAIL },
        to: [{ email: process.env.TO_EMAIL }],
        replyTo: { email, name: nom },
        subject: `${sujet} (de ${nom})`,
        textContent: `Nom: ${nom}\nEmail: ${email}\n\n${message}`
      })
    });

    if (!brevoResponse.ok) {
      const details = await brevoResponse.text();
      console.error('Erreur API Brevo:', brevoResponse.status, details);
      return res.status(502).json({ error: 'Brevo n’a pas pu envoyer le message.' });
    }

    return res.json({ ok: true, message: 'Message envoyé.' });
  } catch (err) {
    console.error('Erreur envoi email:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Erreur serveur lors de l\'envoi du message.' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Contact backend listening on ${port}`));
