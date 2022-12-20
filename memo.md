## Memo - Github / Docker

### Github :
- Cloner le repo : `git clone https://github.com/Ayweth20/Restful-API.git`
- Aller dans le dossier : `cd Restful-API`
- (Faire les modifs)
- Ne pas prendre en compte les fichiers "non désirés" du commit : `git update-index --assume-unchanged node_modules/`
  - (Remettre les fichiers "non désirés" dans le commit : `git update-index --no-assume-unchanged node_modules/`)
- Ajouter les fichiers modifiés : `git add .`
- Annuler l'ajout d'un fichier particulier : `git restore <file>`
- Ajouter les fichiers modifiés : `git commit -m "Message"`  
    (ℹ️) Message type : "Prénom - Add / Update / Delete - Nom de la fonctionnalité"
- Envoyer les modifications sur le repo : `git push`
- Récupérer les dernières modifications des autres : `git pull`

### Docker (optionnel)

## Memo - Lancer le projet :
- Installer Visual Studio Code (https://code.visualstudio.com/)
- Install NodeJS (https://nodejs.org/en/)
- Installer MAMP (https://www.mamp.info/en/) ou WAMP (https://www.wampserver.com/en/)
- Ajouter les extensions suivantes sur VSCode :
    - REST Client (https://marketplace.visualstudio.com/items?itemName=humao.rest-client)
    - (Autres si besoin)
- Exécuter la commande suivante pour installer les packages nécessaires au projet : `npm install --save` (qui installe les dependencies listées dans le fichier package.json)
- Exécuter la commande suivante pour lancer le serveur : `npm start` (recommandée) ou `nodemon index.js`