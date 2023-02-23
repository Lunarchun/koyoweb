const http = require('http');
const path = require('path');
const fs = require('fs');
const themeToggle = document.getElementById('theme-toggle');

// Ecouteur d'événement pour le clic sur le bouton
themeToggle.addEventListener('click', function() {
  // Récupération de l'élément body
  const body = document.body;

  // Ajout ou suppression de la classe 'dark' sur l'élément body
  body.classList.toggle('dark');
});

const server = http.createServer((req, res) => {
  // Si l'utilisateur accède à la racine, chargez index.html par défaut.
  if (req.url === '/') {
    req.url = '/index.html';
  }

  // Obtenez le chemin absolu du fichier demandé.
  const filePath = path.join(__dirname, req.url);

  // Vérifiez si le fichier existe.
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si le fichier n'existe pas, retournez une erreur 404.
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('Fichier non trouvé');
    } else {
      // Si le fichier existe, lisez-le et envoyez-le en réponse.
      const fileStream = fs.createReadStream(filePath);
      res.writeHead(200);
      fileStream.pipe(res);
    }
  });
});

const PORT = process.env.PORT || 3000; // utilise le port 3000 par défaut si aucun n'est spécifié
server.listen(PORT, () => {
  console.log(`Serveur actif sur le port ${PORT}`);
});
