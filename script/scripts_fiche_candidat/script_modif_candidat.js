const queryString = window.location.search;
let idUrl = queryString.split('=')[1];

function remplirFiche (data) {
    for (column of data) {
        document.querySelector('#' + column).value = column
    }
}

console.log(donnees);
if (idUrl == undefined) {
    
    $('#envoyer').click((event) => { 
        event.preventDefault();
        
        let inputs = document.querySelectorAll('input');

        let donnees = {};
        for (element of inputs) {
        donnees[element.id] = element.value;
        }
        donnees['action'] = 'ajouter';

        $.ajax({
            type: 'GET',
            url: '../php/action_company.php',
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
        url: '../php/action_company.php',
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
              remplirFiche(data);
              alert(data.message);
          }
            
        },
        error: () => {
          alert('Erreur !');
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
                    url: '../php/action_company.php',
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