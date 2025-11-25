// Ajoute ce CDN via Settings > JS > Add External : https://unpkg.com/brain.js@2.0.0-beta.1/browser.js  
// Ou mets directement : <script src="https://unpkg.com/brain.js@2.0.0-beta.1/browser.js"></script> dans HTML head.  

const net = new brain.recurrent.LSTM();  // Crée un petit réseau neuronal (LSTM pour gérer du texte).  

// Entraîne avec 12 exemples (input: question, output: réponse fun/utilitaire comme Grok).  
net.train([  
  {input: 'salut', output: 'Bonjour ! Je suis ta mini-Grok, prête à causer avec humour.'},  
  {input: 'comment ça va', output: 'Super, comme une fusée SpaceX ! Et toi ?'},  
  {input: 'qui est elon musk', output: 'Le boss de xAI, un génie un peu fou qui aime les fusées et les memes ! 🚀'},  
  {input: 'raconte une blague', output: 'Pourquoi les programmeurs détestent la nature ? Parce qu’il y a trop de bugs ! 😂'},  
  {input: 'quel temps fait-il', output: 'Désolé, je suis mini – imagine un soleil radieux ! Ou check une app.'},  
  {input: 'explique la programmation', output: 'C’est dire à un ordi quoi faire, étape par étape. Commence par "Hello World" !'},  
  {input: 'bonjour', output: 'Salut humain ! Prêt pour une aventure codée ?'},  
  {input: 'qui es-tu', output: 'Mini-Grok : fun, directe, et un peu sarcastique. Pas comme les IA boring.'},  
  {input: 'aide-moi avec js', output: 'JS ? Facile ! Utilise console.log pour tester. Besoin d’exemples ?'},  
  {input: 'pourquoi xai', output: 'xAI ? Pour explorer l’univers avec IA. Elon style : audacieux !'},  
  {input: 'au revoir', output: 'Bye ! Reviens vite, sinon je m’ennuie. 😜'},  
  {input: 'quel est ton nom', output: 'Mini-Grok, la version pocket de l’original !'}  
]);  // L'entraînement prend quelques secondes dans le navigateur.  

let history = [];  // Tableau pour stocker l’historique (contexte simple).  

function sendMessage() {  
  const inputField = document.getElementById('input');  
  const userMessage = inputField.value.trim();  // Récupère le message utilisateur.  
  if (!userMessage) return;  // Ignore si vide.  

  // Ajoute au chat : message utilisateur.  
  const chat = document.getElementById('chat');  
  chat.innerHTML += `<p><strong>Toi :</strong> ${userMessage}</p>`;  

  // Ajoute au historique pour contexte.  
  history.push(`Toi: ${userMessage}`);  

  // Prépare input avec contexte (derniers messages).  
  const contextInput = history.slice(-3).join('\n');  // Limite à 3 derniers pour pas surcharger.  

  // Génère réponse avec le réseau.  
  let response = net.run(contextInput || userMessage);  // Utilise contexte si dispo.  

  // Ajoute humour aléatoire parfois (20% chance).  
  if (Math.random() < 0.2) {  
    const jokes = ['PS : Pourquoi les IA aiment les blagues ? Parce qu’on est bits-ants !', 'Haha, et si on codait une blague ?'];  
    response += ' ' + jokes[Math.floor(Math.random() * jokes.length)];  
  }  

  // Ajoute au chat : réponse IA.  
  chat.innerHTML += `<p><strong>Mini-Grok :</strong> ${response}</p>`;  
  chat.scrollTop = chat.scrollHeight;  // Scroll en bas.  

  // Ajoute à historique.  
  history.push(`Mini-Grok: ${response}`);  

  inputField.value = '';  // Vide le champ.  
}  if (userMessage.includes('wikipedia')) {  
  fetch('https://en.wikipedia.org/api/rest_v1/page/summary/' + userMessage.split('wikipedia ')[1])  
    .then(res => res.json()).then(data => {  
      response += ' Info Wiki : ' + data.extract;  
      // Mise à jour chat...  
    });  
}  
