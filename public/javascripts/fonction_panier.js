

function refresh_panier_data (velo_a_modifier, nouvelle_quantite) {

 velo_a_modifier.quantite = nouvelle_quantite;
 $( "#table_dynamique" ).load(window.location.href + " #table_dynamique");
}
