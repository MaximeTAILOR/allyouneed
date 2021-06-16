var element = document.querySelector('#print');
const queryString = window.location.search;
var siretUrl = queryString.split('=')[1];
var note
var nom
/*
On charge les infos générales de la fiche,
Les contacts, les missions et les CA
*/


/*
Chargement des informations générales sur l'entreprise
*/

function remplirFiche (data) {
  nom = data['name']
  for (champ of Object.keys(data)) {
    if(data[champ] != ""){
      $('#' + champ).text(data[champ]);
    } else {
      $('#' + champ).addClass("defautlValue")
    }
      
  }

  let elementsDate = data["date"].split('-')
  for (index in elementsDate){
      elementsDate[index] = parseInt(elementsDate[index])
  }
  
  let dateFormulaire = elementsDate[0] + '/' + elementsDate[1] + '/' + elementsDate[2];
  $('#dateDuJour').text(dateFormulaire);

  let note = data.grade;
    for (let numEtoile=1; numEtoile<6; numEtoile++){
        let checkStatus = 'un-check'
        if (numEtoile <= note){
            checkStatus = 'check'
        }
        $('#' + numEtoile).removeClass('un-check')
        $('#' + numEtoile).removeClass('check')
        $('#' + numEtoile).addClass(checkStatus)
    }
  
  if(data.genre == "femme"){
    $('img').attr('src', '../img/women.jpg')
  }

  switch (data["spanco"]){
    case '0':
      $('#etat').text("Suspect")
      break
    
    case '1':
      $('#etat').text("Prospect")
      break
    
    case '2':
      $('#etat').text("Argument")
      break
      
    case '3':
      $('#etat').text("Negociate")
      break
        
    case '4':
      $('#etat').text("Conclusion")
      break
          
    case '5':
      $('#etat').text("Order")
      break                  
  }

  let date = new Date();
  let dateCreation = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
  
  $('#dateDeCreation').text(dateCreation);
}






/*
Dechargement du tableau contact
*/
function updateContactsInfo(siretUrl){
  $.ajax({
    type: 'GET',
    url: '../php/action_contact.php',
    dataType: 'json',
    data : {
        siret : siretUrl,
        action : "afficher",
    },
    success: (data) => {
      for (contacts of data){
        let strLigne =  '<tr>'
        strLigne +=     '<td>' + contacts.name + '</td>'
        strLigne +=     '<td>' + contacts.fname + '</td>'
        strLigne +=     '<td>' + contacts.job + '</td>'
        strLigne +=     '<td>' + contacts.email + '</td>'
        strLigne +=     '<td>' + contacts.num + '</td>'
        strLigne +=     '<td>' + contacts.approach + '</td>'
        strLigne +=     '</tr>'
        let ligne = $(strLigne)
        ligne.appendTo($('#tableContacts'))
      }
    }
  });
}






/*
Déchargement du tableau missions
*/
function updateMissionInfo(siret){
  $.ajax({
    type: 'GET',
    url: '../php/action_mission.php',
    dataType: 'json',
    data : {
      siret : siret,
      action : "afficher",
    },
    success: (data) => {
    for (mission of data){
      /*
      Traitement sur les dates pour un affichage correct
      */
      //affichage de la date d'ouverture
      let elementsDate = mission["opendate"].split('-')
      for (index in elementsDate){
        elementsDate[index] = parseInt(elementsDate[index])
      }
      let dateOuverture = elementsDate[2] + '/' + elementsDate[1] + '/' + elementsDate[0];

      let strLigne =  '<tr>'
      strLigne +=     '<td>' + dateOuverture + '</td>'
      strLigne +=     '<td>' + mission["post"] + '</td>'
      strLigne +=     '<td>' + mission["manager"] + '</td>'
      if (mission["endorsed"]>=0){
        strLigne+=     '<td>Cloturé</td>'
      } else {
        strLigne+=    '<td>En cours</td>'
      }
      strLigne +=     '</tr>'
      let ligne = $(strLigne)
      ligne.appendTo($('#tableMission'))
      }
    }
  });
}





/*
Déchargement de la table de CA
*/
function updateCAInfo(siretUrl){
  $.ajax({
    type: 'GET',
    url: '../php/action_revenue.php',
    dataType: 'json',
    data : {
      siret : siretUrl,
      action : "afficher",
    },
    success: (data) => {
      for (revenuCA of data){
        let strLigne =  '<tr>'
        strLigne +=     '<td>'+ revenuCA["post"] +'</td>'
        strLigne +=     '<td>'+ revenuCA["salary"] + '</td>'
        strLigne +=     '<td>'+ revenuCA["percentage"] +'</td>'
        strLigne +=     '<td>'+ revenuCA["turnover"] +'</td>'
        strLigne +=     '</tr>'
        let ligne = $(strLigne)
        ligne.appendTo($('#tableCA'))
      }
      let totalCA=0
      //On doit utiliser deux fois .children() parce que le tableau créé automatiquement un div tbody
      //$('#tableCA').children() nous rend donc ce tbody et non les lignes voulues
  
      for (ligne of $('#tableCA').children().children()){
          if(ligne.classList != 'en-tete'){
              totalCA+= parseInt(ligne.cells[3].textContent)
          }
      }
      $('#totalCA').text(totalCA)
    }
  });
}





$.ajax({
  type: 'GET',
  url: '../php/action_company.php',
  dataType: 'json',
  data : {
    'action' : 'afficher',
    'siret' : siretUrl
  },
  success: (data) => {
      //La requête a abouti !
      remplirFiche(data[0]);
  }
});


function sauvegarderEnPDF(entreprise){
  html2pdf(element, {
    margin:       10,
    filename:     `compte_rendu_${entreprise}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4, useCORS: true, logging: true, dpi: 192, letterRendering: true},
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  })
}



updateContactsInfo(siretUrl)
updateMissionInfo(siretUrl)
updateCAInfo(siretUrl)

setTimeout(()=>{sauvegarderEnPDF(nom)}, 1000)
