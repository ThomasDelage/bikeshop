
function ajout_menu(cible) {

var composition_menu = "<nav class='navbar navbar-expand-lg navbar-light bg-light'><a class='navbar-brand' href='#'>Bikeshop <i class='fas fa-bicycle'></i></a><button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button><div class='collapse navbar-collapse' id='navbarSupportedContent'><ul class='navbar-nav mr-auto'><li class='nav-item'><a class='nav-link' href='#'>Connexion</a></li><li class='nav-item'><a class='nav-link' href='#'>Eshop</a></li><li class='nav-item'><a class='nav-link' href='#'>Panier</a></li></ul><span class='navbar-text'>Bienvenue sur le shop <%= login %>, (<%= email %>)</span><div id='suivi_panier'> <i class='fas fa-cart-arrow-down'></i> <span id='compteur_panier'><%= login %></span></div></nav>";

console.log("Ajout_menu a été exécuté");

  return cible.insertAdjacentHTML('afterbegin', composition_menu);

}
