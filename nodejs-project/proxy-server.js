const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const port = 3000;

const benutzername = 'NM114524';
const password = '6XV5B4RY';

const base64encodedData = Buffer.from(benutzername + ':' + password).toString('base64');
const proxy = httpProxy.createProxyServer({secure:false, headers:{
    'Authorization': 'Basic ' + base64encodedData
  },});

// Middleware, um CORS (Cross-Origin Resource Sharing) zu ermöglichen
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Konfigurationsliste der Ressourcen und deren Pfade
const resourceConfigs = [
  { path: '/Produkt/Risikoklassen', target: 'https://fondsnet.depotplattform.de/app.php/Produkt/Risikoklassen/' },
  { path: '/Produkt/Wertpapier', target: 'https://fondsnet.depotplattform.de/app.php/Produkt/Wertpapier/' },
  { path: '/WertpapierPreis', target: 'https://fondsnet.depotplattform.de/app.php/WertpapierPreis/' },
  { path: '/Bestand', target: 'https://fondsnet.depotplattform.de/app.php/Bestand/' },
  { path: '/Konto', target: 'https://fondsnet.depotplattform.de/app.php/Konto/' },
];

// Iterieren Sie durch die Konfigurationsliste und fügen Sie Proxy-Routen hinzu
resourceConfigs.forEach((config) => {
  app.use(config.path, (req, res) => {
    proxy.web(req, res, { target: config.target });
  });
});

app.listen(port, () => {
  console.log(`Proxy-Server läuft auf Port ${port}`);
});