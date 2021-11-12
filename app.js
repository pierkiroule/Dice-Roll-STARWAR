//Déclarartion des variables principales

var scores, roundScore, activePlayer, gamePlaying;
const ambiance = new Audio('Audio/ambiance.mp3');

/**************************/
/* INITIALISONS LE JEU */
/************************/

//initialisons le jeu. SI l'utilisateur clique sur le bouton "newgame"" ALORS une fonction javascript initialise les scores, les affichages des images, les sons etc.

// Le bouton et évènement associé. Javascript écoute SI un évènement "click sur le bouton newgame" se produit. Pour écouter, nous indiquons une sélection queryselector pour aider javascript à écouter le bon bouton. SI bouton activé, ALORS function init(){}. Quelles instructions allons-nous insérer dans {};
document.querySelector(".btn-new").addEventListener('click', init);

function init() {
  
//notre variable booléenne est vraie car nous lançons le jeu
  gamePlaying = true;
// Comment sont initialisées au début du jeu nos valeurs de la variable score global (Jedïforce) et score courant (Padaforce)
  scores = [0, 0];
  roundScore = 0;
// quel va être le joueur activé 0 (padawan1) ou 1 (padawan 2). Padawan 1 jouera en premier !
  activePlayer = 0;

  // Comment sont afficher des images et animations au début du jeu
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.anim').style.display = 'block';


  // réinitialiser l'affichage de nos scores à 0, pour chacun de nos joueurs (les padawans)
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0'; 

  // S'assurer que le style (classe .active du css) du panneau du joueur courant est bien appliqué et que celui de l'autre joueur est bien désactivé
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  //Lancer notre ambiance sonore. Une sorte de musique d'attente avant le premier lancé. Nous mettrons sur pause lorsque le premier lancé est réalisé.
  
  ambiance.play();

};


/*********************************/
/* GERER LE CHANGEMENT DE JOUEUR*/
/********************************/

// Créons la fonction nextPlayer. 
function nextPlayer() {
    
    // Est-ce le tour du prochain joueur si le joueur courant fait force 6. La technique repérée sur les des examples est celle de l'opérateur ternaire, condition ? exprSiVrai : exprSiFaux
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // remettre le compteur score du round à 0
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // ajouter la classe style css au joueur courant
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Affichons-nous nos images et animations
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.anim').style.display = 'none';

};

