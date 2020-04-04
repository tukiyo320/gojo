const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://gojo-b7add.firebaseio.com'
});

const db = admin.firestore();

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

async function generateSignedUrl (filename) {
  // [START storage_generate_signed_url]
  // Imports the Google Cloud client library
  const { Storage } = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage({
    projectId: "gojo-b7add",
    keyFilename: "service_key.json"
  });

  const bucketName = 'gojo-b7add.appspot.com';
  const options = {
    action: 'read',
    expires: Date.now() + 1000 * 60 * 60 * 24 * 30 // 1month
  };

  // Get a signed URL for the file
  const [url] = await storage
    .bucket(bucketName)
    .file(filename)
    .getSignedUrl(options);

  console.log(`The signed url for ${filename} is ${url}.`);
  // [END storage_generate_signed_url]
  return url
}

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
  console.log("request");
  db.collection('decks').doc(req.params.id).get()
    .then((doc) => {
      if (!doc.exists) {
        throw Error(`${req.params.id} not exist`);
      } else {
        return generateSignedUrl(`${req.params.id}.png`)
      }
    })
    .then((url) => {
      const html = genHtml(url);
      res.set('cache-control', 'public, max-age=3600');
      res.send(html)
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send('404 Not Exist')
    });
});
exports.s = functions.https.onRequest(app);