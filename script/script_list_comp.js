/*
 * Partie remplissage du tableau
 * On prend les données dans la bd avec une rq AJAx
 * Puis on insère les lignes une par une
*/
//Fonctions
function remplirTableau(data){
    for (company of data){
        let html =  $("<tr>");
        html.html(html.html() + `<td>${company.company}</td>`);
        html.html(html.html() + `<td>${company.ape}</td>`);
        html.html(html.html() + `<td>${company.prenom}</td>`);
        html.html(html.html() + `<td>${company.nom}</td>`);
        html.html(html.html() + `<td>${company.email}</td>`);
        html.html(html.html() + `<td><a href="#", class="trigger-popup">Acceder a la fiche complète</a></td>`);
        html.html(html.html() + "</tr>");
        $('table').append(html)
    }
    initLiens();
}



//Script principal
$.ajax({
    type: 'GET',
    url: '../php/list_company.php',
    dataType: 'json',
    success: (data) => {
        if (typeof data.error === 'undefined'){
            remplirTableau(data);
        } else {
            alert(data.message);
        }
    },
    error: () => {
      alert('Erreur !');
    }
  });





/*
 * Partie interraction avec le tableau 
 * Permet d'accèder a la fiche détaillée en cliquant sur un lien
 * Le fait en lisant les lignes
*/

//fonctions
function initLiens(){
    $('.trigger-popup').click(function (event) { 
        event.preventDefault();
        //On réinitialise la fenêtre pop-up puis on l'affiche
        $('.pop-up').html('<span class="close">x</span>')
        //On réassocie l'event
        $('.close').click(() => {
            console.log('fonction trigger')
            $('.fermeture_pop-up').toggle();
        });

        $('.fermeture_pop-up').toggle();

        //sélection du conteneur dans lequel on vas placer les infos
        let conteneur=$('.pop-up')

        //On retourne chercher les informations de la ligne
        //on les stocke dans une liste
        let ligneDuTableau = $(this).parent().parent();
        let cases = ligneDuTableau.children();
        let informations = {
            'company' : cases[0].textContent,
            'ape' : cases[1].textContent,
            'prenom' : cases[2].textContent,
            'nom' : cases[3].textContent,
            'email' : cases[4].textContent,
        };
        
    conteneur.append("<p>Entreprise :<br>" + informations['company'] + "</p>");
    conteneur.append("<p>ape :<br>" + informations['ape'] + "</p>") ;
    conteneur.append("<p>Prenom :<br>" + informations['prenom'] + "</p>") ;
    conteneur.append("<p>Nom :<br>" + informations['nom'] + "</p>");
    conteneur.append("<p>Email :<br>" + informations['email'] + "</p>")
    });
}


//evenements
$('.fermeture_pop-up').click(() => {
    $('.fermeture_pop-up').toggle();
});

$('.pop-up').click((e) => {
    e.stopPropagation();
});