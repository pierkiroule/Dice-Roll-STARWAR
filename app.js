//Déclarartion des variables principales
var scores, roundScore, activePlayer, gamePlaying;
//constantes pour effets audio
const ambiance = new Audio('Audio/ambiance.mp3');
const audioDice = new Audio('Audio/fx1.mp3');
const audioHold = new Audio('Audio/fx2.mp3');
const audioWin = new Audio('Audio/win.mp3');
const audioOuch = new Audio('Audio/ouch.mp3');

/**************************/
/* INITIALISONS LE JEU */
/************************/

// Initialiser
init();

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

  // Afficher ou pas des images et animations au début du jeu
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.anim').style.display = 'block';

  // réinitialiser l'affichage de nos scores à 0, pour chacun de nos joueurs (les padawans)
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0'; 

  // S'assurer que le style (classe .active du css) du panneau du joueur courant est bien appliqué et que celui de l'autre joueur est bien désactivé
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  //Lancer notre ambiance sonore. Une sorte de musique d'attente avant le premier lancé. Nous mettrons sur pause lorsque le premier lancé est réalisé.
  
  ambiance.play();

  //Gestion du statut gagnant. Désactiver au démarrage du jeu
  document.getElementById('name-0').textContent = 'PADAWAN 1';
  document.getElementById('name-1').textContent = 'PADAWAN 2'; 

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  //important a indiquer pour afficher le style css du panneau actif pour le joueur actif et désactiver pour l'autre padawan
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

  

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
document.querySelector('.btn-roll').addEventListener('click', function()
{//audio fx
    audioDice.play();
    ambiance.pause();
    
    
    // SI la partie est lancée ALORS...
    if(gamePlaying) 
    {

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
        if(dice !== 6) 
        { roundScore += dice;    
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else 
        {
            audioOuch.play();
            audioDice.pause();
            nextPlayer();
        }

    }


    
});



/***************************************/
/*GERER LE STOCKAGE DE LA FORCE (HOLD)*/
/*************************************/

//Sélectionner le bouton hold 
document.querySelector('.btn-hold').addEventListener('click', function()
{ // ajouter l'effet audio
    audioHold.play();
// SI la partie est lancée ALORS on incrémente le score global avec les points du score courant.   
    if(gamePlaying)
    {

        scores[activePlayer] += roundScore; 

// on affiche le score mis à jour
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

// VERIFIER SI LE JOUEUR GAGNE. IF score global est égal ou superieur à score max. Dans notre cas, nous choisissons le nombre 12 car nous aimons bien le nombre 12. c'est notre nombre porte bonheur ! Plus sérieusement, cela permet de tester notre jeu plus facilement que le nombre 100.
        if(scores[activePlayer] >= 12)
        {  
            //audio gagnant
            audioWin.play();
            // afficher une anim pour le gagnant
            document.querySelector('.anim').style.display = 'block';

            // afficher le nom du gagnant  
            document.querySelector('#name-' + activePlayer).textContent = 'BRAVO FUTUR JEDI !';

            // cacher l'image du dé (de la FORCE)
            document.querySelector('.dice').style.display = 'none';

            
            // activer le style css du panneau en mode winner
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

            // désactiver le style css de panneau joueur
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            // FIN de partie
            gamePlaying = false;
            

        } else
        {
            //SINON SI score global n'atteind pas le max défini alors on passe au joueur suivant
            nextPlayer();
        }
        
    }
}



);
/****************/
/*Regle du JEU*/
/**************/
function regleDuJeu() {
   
   confirm("Il vous faut chers Padawans apprendre à capter la force avec prudence et sagesse. Concentrez vous et pensez bien à stocker la force au moment opportun. Vous désirez capter la force mais attention... Trop de force et d'impatience... tue la force virtuelle accumulée (La PADAFORCE). Votre mission est de cumuler 12 points de Jedï force. Que le meilleur gagne ! Mister YODA") 
  };

  /****************/
/*credit*/
/**************/
function credit() {
   
    confirm("Merci à giphy.com pour les gifs et pierkiroule pour les sons") 
   };
 
   
   
   
  
  
  