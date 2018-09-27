var express = require('express');
var router = express.Router();

// Initialisation du catalogue des vélos disponibles
var dataBike = [
  {"id": "velo1", "nom": "Biko33", "photo": "images/bike-1.jpg", "prix":679},
  {"id": "velo2","nom": "Biko34", "photo": "images/bike-2.jpg", "prix":888},
  {"id": "velo3","nom": "Biko3", "photo": "images/bike-3.jpg", "prix":999},
  {"id": "velo4","nom":"Biko4", "photo": "images/bike-4.jpg", "prix":1099},
  {"id": "velo5","nom": "Biko5", "photo": "images/bike-5.jpg", "prix":1899},
  {"id": "velo6","nom": "Biko6", "photo": "images/bike-6.jpg", "prix":1999}
]

// Initialisation du panier
//var dataCardBike = [
//]

//=================================================================================================================================
/* Création de la home page */
router.get('/', function(req, res, next) {
  res.render('index', {donnees_velos: dataBike});
});


//=================================================================================================================================


/* Création de la route vers le shop */
router.post('/shop', function(req, res, next) {

//On crée une variable dataCardBike si elle n'existe pas, sinon on récupère l'existante

  if (typeof req.session.dataCardBike == "undefined" ) {
      req.session.dataCardBike = [];
  }

  var present_dans_tableau = 0;

// Récupération du vélo ajouté au panier, selon le choix sur la boutique
req.session.nom_velo = req.body.nom_velo ;

// Boucle pour regarder si le vélo ajouté est déjà dans le panier, auquel cas la quantité est incrémentée
    for (i=0; i < req.session.dataCardBike.length; i++) {
      if ( req.session.dataCardBike[i].id == req.body.nom_velo) {
        req.session.dataCardBike[i].quantite = Number(req.session.dataCardBike[i].quantite) + 1;
        present_dans_tableau = 1;
      }
    }

// Si le vélo n'est pas dans le panier, on ajoute un élément dans la liste comprenant le vélo en question
    if (present_dans_tableau == 0) {

          for (j=0; j < dataBike.length; j++) {
            if (dataBike[j].id == req.session.nom_velo) {
                var velo_a_pousser = dataBike[j];
              velo_a_pousser["quantite"] = 1;
              req.session.dataCardBike.push(velo_a_pousser);
              }
            }
}
  res.render('shop', {velos_panier:req.session.dataCardBike});
}
);


module.exports = router;


//=================================================================================================================================

/* Création de la route vers delete-shop */
router.post('/delete-shop', function(req, res, next) {
  console.log("Panier avant suppression:" + JSON.stringify(req.session.dataCardBike));
  console.log("Velo a supprimer: " + req.body.velo_a_supprimer);

// Baisse de quantité pour le vélo concerné
      for (i=0; i < req.session.dataCardBike.length; i++) {
        if ( req.session.dataCardBike[i].id == req.body.velo_a_supprimer) {
          console.log("Dans la boule de suppression numero " + i);
          req.session.dataCardBike.splice(i,1);
        }
      }

      console.log("Panier apres suppression:" + JSON.stringify(req.session.dataCardBike));
  res.render('shop', {velos_panier:req.session.dataCardBike});
});




//=================================================================================================================================

/* Création de la route vers refresh-shop */
router.post('/refresh-shop', function(req, res, next) {
  console.log("Panier avant refresh:" + JSON.stringify(req.session.dataCardBike));
  console.log("Velo à rafraichir: " + req.body.id_du_velo_a_refresh);
  console.log("Quantité à rafraichir: " + req.body.quantite);

// Mise à jour quantité pour le vélo concerné
      for (i=0; i < req.session.dataCardBike.length; i++) {
        if ( req.session.dataCardBike[i].id == req.body.id_du_velo_a_refresh) {
          console.log("Dans la boule de suppression numero " + i);
          req.session.dataCardBike[i].quantite = req.body.quantite;
        }
      }

      console.log("Panier apres mis a jour:" + JSON.stringify(req.session.dataCardBike));
  res.render('shop', {velos_panier:req.session.dataCardBike});
});
