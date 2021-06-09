const queryString = window.location.search;
let idUrl = queryString.split('=')[1];

function remplirFiche (data) {
    for (champ of Object.keys(data)) {
        $('#' + champ).val(data[champ]);
    }
    $('#note').text(data.note);
    updateAfficheNote();
    updateImg()
}

function genreCheck(donnees) {
    if ($('#homme').is(':checked')) {
        delete donnees['homme']
        delete donnees['femme']
        donnees['genre'] = 'homme'
    }
    if ($('#femme').is(':checked')) {
        delete donnees['homme']
        delete donnees['femme']
        donnees['genre'] = 'femme'
    }
}

function updateAfficheNote(){
    note = $('#note').text()

    for (let numEtoile=1; numEtoile<6; numEtoile++){
        let checkStatus = 'un-check'
        if (numEtoile <= note){
            checkStatus = 'check'
        }
        $('#' + numEtoile).removeClass('un-check')
        $('#' + numEtoile).removeClass('check')
        $('#' + numEtoile).addClass(checkStatus)
    }
}

function updateImg(){
    if ($('#femme').is(':checked')) {
        $('img').attr('src', '../img/women.jpg')
    }
}

if (idUrl == undefined) {
    
    $('#envoyer').click((event) => { 
        event.preventDefault();
        
        let inputs = $("input:not(#envoyer)")

        let donnees = {};
        for (element of inputs) {
        donnees[element.id] = element.value;
        }
        donnees['action'] = 'ajouter';
        donnees['typeDeContrat'] = $('#typeDeContrat').val();
        donnees['compteRenduAgent'] = $('#compteRenduAgent').val();
        donnees['statutCandidat'] = $('#statutCandidat').val();
        donnees['avisAgent'] = $('#avisAgent').val();
        donnees['origine'] = $('#origine').val();
        donnees['idcustomer'] = idUrl;
        donnees['note'] = $('#note').text();

        genreCheck(donnees);

        $.ajax({
            type: 'GET',
            url: '../php/action_customer.php',
            dataType: 'json',
            data : donnees,
            success: (data) => {
                if (data.error){
                    alert(data.message);
                } else {
                    alert(data.message);
                }
                
            },
            error: (data) => {
                alert('Erreur !')
            }
        });
    });
} else {

    $.ajax({
        type: 'GET',
        url: '../php/action_customer.php',
        dataType: 'json',
        data: {
            idcustomer : idUrl,
            action : 'afficher'
        },
        success: (data) => {
          if (data.error){
              alert(data.message);
          } else {
              remplirFiche(data[0]);
          }
            
        },
        error: (error) => {
          alert(error);
        }
    });
    $('#envoyer').click((event) => { 
        event.preventDefault();

        let inputs = document.querySelectorAll('input');

        let donnees = {};
        for (element of inputs) {
        donnees[element.id] = element.value;
        }
        donnees['action'] = 'modifier';
        donnees['idcustomer'] = idUrl;
        donnees['typeDeContrat'] = $('#typeDeContrat').val();
        donnees['compteRenduAgent'] = $('#compteRenduAgent').val();
        donnees['statutCandidat'] = $('#statutCandidat').val();
        donnees['avisAgent'] = $('#avisAgent').val();
        donnees['origine'] = $('#origine').val();
        donnees['note'] = $('#note').text();

        genreCheck(donnees);

        $.ajax({
            type: 'GET',
            url: '../php/action_customer.php',
            dataType: 'json',
            data : donnees,
            success: (data) => {
                if (data.error){
                    alert(data.message);
                } else {
                    alert(data.message);
                }
                
            },
            error: (data, error) => {
                alert('Erreur !')
            }
        });
    });    
    
}