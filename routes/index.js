var express = require('express');
var router = express.Router();

// Initialisation du catalogue des vélos disponibles
var dataBike = [
  {"id": "velo1", "nom": "Biko33", "photo": "images/bike-1.jpg", "prix":679},
  {"id": "velo2","nom": "Biko34", "photo": "images/bike-2.jpg", "prix":888},
  {"id": "velo3","nom": "Biko3", "photo": "images/bike-3.jpg", "prix":999},
  {"id": "velo4","nom":"Biko4", "photo": "images/bike-4.jpg", "prix":1099},
  {"id": "velo5","nom": "Biko5", "photo": "images/bike-5.jpg", "prix":1899},
  {"id": "velo6","nom": "Biko6666", "photo": "images/bike-6.jpg", "prix":1999}
]

var montant_facture = 0;

var cle_test_stripe = "sk_test_RaXpq8qUaI7mXLeR3DB8J1CQ";




//=================================================================================================================================
/* Création de la page d'accueil */
router.get('/', function(req, res, next) {
  res.render('landing', {donnees_velos: dataBike});
});



//=================================================================================================================================
/* Création de la page shop */
router.post('/shop', function(req, res, next) {

  //Récupération de l'email et login de l'utilisateur
      req.session.email = req.body.email ;
      email = req.session.email;
      req.session.login = req.body.login ;
      login = req.session.login;

var compteur_panier =0;
if (typeof dataCardBike == "undefined" ) {
    compteur_panier = 0;
} else {
  compteur_panier = dataCardBike.length;
}


  res.render('shop', {donnees_velos: dataBike, email, login, compteur_panier});
});


//=================================================================================================================================


/* Création de la route vers le shop */
router.post('/basket', function(req, res, next) {

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


//Récupération de l'email et login de l'utilisateur
    req.session.email = req.body.email ;
    req.session.login = req.body.login ;
    email = req.session.email;
    login = req.session.login;

//MAJ compteur panier et facture

      compteur_panier = req.session.dataCardBike.length;

      // MAJ valeur facture totale

      montant_facture = 0;
          for (i=0; i < req.session.dataCardBike.length; i++) {
              if (req.session.dataCardBike[i].quantite > 0) {
                console.log("Boucle numéro : " + i);
                console.log("Incrément du montant total");
                montant_facture = montant_facture + (req.session.dataCardBike[i].quantite * req.session.dataCardBike[i].prix);
                console.log(montant_facture);

              } else {
                console.log("Boucle numéro : " + i);
                console.log("Pas d'ajout");
              }

          }


      console.log("Montant facture : " + montant_facture);
  res.render('basket', {velos_panier:req.session.dataCardBike, email, login, compteur_panier, montant_facture});
}
);


module.exports = router;


//=================================================================================================================================

/* Création de la route vers delete-shop */
router.post('/delete-basket', function(req, res, next) {


// Baisse de quantité pour le vélo concerné
      for (i=0; i < req.session.dataCardBike.length; i++) {
        if ( req.session.dataCardBike[i].id == req.body.velo_a_supprimer) {
          console.log("Dans la boule de suppression numero " + i);
          req.session.dataCardBike.splice(i,1);
        }
      }


      //Récupération de l'email et login de l'utilisateur
          req.session.email = req.body.email ;
          req.session.login = req.body.login ;
          email = req.session.email;
          login = req.session.login;

      //MAJ compteur panier et panier total

            compteur_panier = req.session.dataCardBike.length;

            // MAJ valeur facture totale

            montant_facture = 0;
                for (i=0; i < req.session.dataCardBike.length; i++) {
                    if (req.session.dataCardBike[i].quantite > 0) {
                      console.log("Boucle numéro : " + i);
                      console.log("Incrément du montant total");
                      montant_facture = montant_facture + (req.session.dataCardBike[i].quantite * req.session.dataCardBike[i].prix);
                      console.log(montant_facture);

                    } else {
                      console.log("Boucle numéro : " + i);
                      console.log("Pas d'ajout");
                    }

                }



      console.log("Panier apres suppression:" + JSON.stringify(req.session.dataCardBike));
  res.render('basket', {velos_panier:req.session.dataCardBike, login, email, compteur_panier, montant_facture});
});



//=================================================================================================================================

/* Création de la route vers refresh-shop */
router.post('/refresh-basket', function(req, res, next) {

// Mise à jour quantité pour le vélo concerné
      for (i=0; i < req.session.dataCardBike.length; i++) {
        if ( req.session.dataCardBike[i].id == req.body.id_du_velo_a_refresh) {
          console.log("Dans la boule de suppression numero " + i);
          req.session.dataCardBike[i].quantite = req.body.quantite;
        }
      }

      //Récupération de l'email et login de l'utilisateur
          req.session.email = req.body.email ;
          req.session.login = req.body.login ;
          email = req.session.email;
          login = req.session.login;

      //MAJ compteur panier et facture totale

          compteur_panier = req.session.dataCardBike.length;

      // MAJ valeur facture totale

      montant_facture = 0;
          for (i=0; i < req.session.dataCardBike.length; i++) {
              if (req.session.dataCardBike[i].quantite > 0) {
                console.log("Boucle numéro : " + i);
                console.log("Incrément du montant total");
                montant_facture = montant_facture + (req.session.dataCardBike[i].quantite * req.session.dataCardBike[i].prix);
                console.log(montant_facture);

              } else {
                console.log("Boucle numéro : " + i);
                console.log("Pas d'ajout");
              }

          }


  res.render('basket', {velos_panier:req.session.dataCardBike, login, email, compteur_panier, montant_facture});
});



//=================================================================================================================================
/* Création de la page de checkout */
router.post('/checkout', function(req, res, next) {

  console.log(req.body);

  // Recalcul facture totale

  montant_facture = 0;
      for (i=0; i < req.session.dataCardBike.length; i++) {
          if (req.session.dataCardBike[i].quantite > 0) {
            console.log("Boucle numéro : " + i);
            console.log("Incrément du montant total");
            montant_facture = montant_facture + (req.session.dataCardBike[i].quantite * req.session.dataCardBike[i].prix);
            console.log(montant_facture);

          }
      }

//Récupération email et login
req.session.login = req.body.login;
req.session.email = req.body.email;


  // Installation de stripe ====================================================================================================

  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys
  var stripe = require("stripe")(cle_test_stripe);

  // Token is created using Checkout or Elements!
  // Get the payment token ID submitted by the form:
  const token = req.body.stripeToken; // Using Express


  const charge = stripe.charges.create({
    amount: montant_facture*100,
    currency: 'eur',
    description: "'" + req.session.email + " " + req.session.login + " " + req.session.stripeToken + "'" ,
    source: token,
  });




  console.log(req.body);
  res.render('checkout', {email, login, montant_facture});
});
