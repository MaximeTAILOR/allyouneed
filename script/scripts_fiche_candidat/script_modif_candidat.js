const queryString = window.location.search;
let idUrl = queryString.split('=')[1];

function remplirFiche (data) {
    console.log(data);
    for (champ of Object.keys(data)) {
        $('#' + champ).val(data[champ]);
    }
}

function genreCheck(donnees) {
    if ($('#homme').is(':checked')) {
        delete donnees['homme'];
        delete donnees['femme'];
        donnees['genre'] = 'homme';
    }
    if ($('#femme').is(':checked')) {
        delete donnees['homme'];
        delete donnees['femme'];
        donnees['genre'] = 'femme';
    }
}

if (idUrl == undefined) {
    
    $('#envoyer').click((event) => { 
        event.preventDefault();
        
        let inputs = $("input:not(#envoyer)");

        let donnees = {};
        for (element of inputs) {
        donnees[element.id] = element.value;
        }
        donnees['action'] = 'ajouter';
        donnees['typeDeContrat'] = $('#typeDeContrat').val();
        donnees['compteRenduAgent'] = $('#compteRenduAgent').val();
        donnees['statutCandidat'] = $('#statutCandidat').val();
        donnees['avisAgent'] = $('#avisAgent').val();

        genreCheck(donnees);

        $.ajax({
            type: 'GET',
            url: '../php/action_customer.php',
            dataType: 'json',
            data : donnees,
            success: (data) => {
                console.log(data);
                if (data.error){
                    alert(data.message);
                } else {
                    alert(data.message);
                }
                
            },
            error: () => {
                alert('Erreur !');
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
          console.log(data);
          if (data.error){
              alert(data.message);
          } else {
              console.log('gg');
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

        $('#envoyer').click((event) => { 
            event.preventDefault();
                $.ajax({
                    type: 'GET',
                    url: '../php/action_customer.php',
                    dataType: 'json',
                    data : donnees,
                    success: (data) => {
                      console.log(data);
                      if (data.error){
                          alert(data.message);
                      } else {
                          alert(data.message);
                      }
                        
                    },
                    error: () => {
                      alert('Erreur !');
                    }
                });
        });    
    });
}