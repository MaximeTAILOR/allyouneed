var element = document.querySelector('#print');
const queryString = window.location.search;
var idUrl = queryString.split('=')[1];
var note


function remplirFiche (data) {
  for (champ of Object.keys(data)) {
    if(data[champ] != ""){
      $('#' + champ).text(data[champ]);
    } else {
      $('#' + champ).addClass("defautlValue")
    }
      
  }

  let elementsDate = data["dateDuJour"].split('-')
  for (index in elementsDate){
      elementsDate[index] = parseInt(elementsDate[index])
  }

  let dateFormulaire = elementsDate[0] + '/' + elementsDate[1] + '/' + elementsDate[2];
  $('#dateDuJour').text(dateFormulaire);

  let note = data.note;
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


  let date = new Date();
  let dateCreation = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
  
  $('#dateDeCreation').text(dateCreation);


  sauvegarderEnPDF(data['nom'], data['prenom'])
}




function sauvegarderEnPDF(nom, prenom){
  html2pdf(element, {
    margin:       10,
    filename:     `compte_rendu_${nom}_${prenom}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 4, useCORS: true, logging: true, dpi: 192, letterRendering: true},
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  })
}





$.ajax({
  type: 'GET',
  url: '../php/action_customer.php',
  dataType: 'json',
  data : {
    'action' : 'afficher',
    'idcustomer' : idUrl
  },
  success: (data) => {
      if (data.error){
          alert(data.message)
      } else {
        //La requête a abouti !
        remplirFiche(data[0]);
      }
  },
  error: (data) => {
      alert('Erreur !')
  }
});