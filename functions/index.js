const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const storage = admin.storage();

const site_name = 'ふるよに双掌繚乱＆眼前構築シミュレーター';
const title = 'ふるよに双掌繚乱＆眼前構築シミュレーター';
const meta_description = 'ふるよに双掌繚乱＆眼前構築シミュレーター';
const meta_keywords = ['プログラミング'];
const og_description = 'ふるよに双掌繚乱＆眼前構築シミュレーター';
const og_image_width = 1200;
const og_image_height = 630;
const fb_appid = '';
const tw_description = 'ふるよに双掌繚乱＆眼前構築シミュレーター';
const tw_site = '';
const tw_creator = '';

const genHtml = (imageUrl) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="description" content=${meta_description}>
    <meta name="keywords" content=${meta_keywords.join(',')}>
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <meta property="og:url" content=${imageUrl}>
    <meta property="og:title" content=${title}>
    <meta property="og:site_name" content=${site_name}>
    <meta property="og:description" content=${og_description}>
    <meta property="og:image" content=${imageUrl}>
    <meta property="og:image:width" content=${og_image_width}>
    <meta property="og:image:height" content=${og_image_height}>
    <meta property="fb:app_id" content=${fb_appid}>
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content=${title}>
    <meta name="twitter:description" content=${tw_description}>
    <meta name="twitter:image" content=${imageUrl}>
    <meta name="twitter:site" content=${tw_site}>
    <meta name="twitter:creator" content=${tw_creator}>
  </head>
  <body>
    <script>
      location.href = '/';
    </script>
  </body>
</html>
`;

app.get('/:id', async (req, res) => {
  const doc = await db.collection('decks').doc(req.params.id).get();
  if (!doc.exists) {
    console.log(`${req.params.id} not exist`);
    res.status(404).send('404 Not Exist')
  } else {
    const url = await storage.ref(`${req.params.id}.png`).getDownloadURL();
    const html = genHtml(url);
    res.set('cache-control', 'public, max-age=3600');
    res.send(html)
  }
});
exports.s = functions.https.onRequest(app);