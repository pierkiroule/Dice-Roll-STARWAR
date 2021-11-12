//Déclarartion des variables principales
var scores, roundScore, activePlayer, gamePlaying;
//constantes pour effets audio
const ambiance = new Audio('Audio/ambiance.mp3');
const audioDice = new Audio('Audio/fx1.mp3');
const audioHold = new Audio('Audio/fx2.mp3');

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

/*********************************/
/*LANCER LE DE (LA FORCE STARWARS ;)*/
/********************************/
// Nous utilisons une fonction anonyme pour gérer le lancé de dé. Dans notre cas Starwars, nous choisissons la valeur 6 (comme un paradoxe, la force 6 est trop puissante et annule la force) comme condition de la perte des points du round score.
// Sélectionnon
document.querySelector('.btn-roll').addEventListener('click', function(){
    
    
    // SI la partie est lancée ALORS...
    if(gamePlaying) {

        //nombre aléatoire pour la force, le dé en fait !
        var dice = Math.floor(Math.random() * 6) + 1;
        // nombre aléatoire pour les images de fin de partie (des images aléatoires qui dynamiseront le jeu. A chaque partie on découvre un gif animé starwars)
        var anim = Math.floor(Math.random() * 10) + 1;

        // afficher les images résultat du dé
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dicegif/dice-' + dice + '.gif';    

        //Idem pour les gifs animés. Ne pas les afficher au début.
        var animDOM = document.querySelector('.anim');
        animDOM.style.display = 'none';
        animDOM.src = 'Anim/anim-' + dice + '.gif'; 

        // SI dice est strictement inégal à force 6 ALORS on ajoute le score SINON on perd le tour et on change de joueur.
        if(dice !== 6) {       
            
            roundScore += dice;    
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
           
            nextPlayer();
        }

    }
    
}
// ajout des effets audio pour le lancé et pause de l'ambiance musicale. On ajoute les constantes dans la déclaration des variables tout en haut. const audioDice = new Audio('Audio/fx1.mp3') const audioHold = new Audio('Audio/fx2.mp3')
audioDice.play();
ambiance.pause();
    );

