let spancoColumn;
let rowColumn;


$.ajax({
    type: 'GET',
    url: '../php/action_company.php',
    dataType: 'json',
    data : {
        siret : siretUrl,
        action : "afficher",
    },
    success: (data) => {
      if (data.error){
          alert(data.message);
      } else {
          initSpanco(data);
      }
        
    },
    error: (error) => {
      alert('Erreur !');
    }
  });
function initSpanco(data){
    spancoColumn = '#colonne' + data[0]['spanco'];
    let spancoCompInit = $('#logo').clone();
    let spancoArrowsInit = $('#arrow').clone();
    $('#logo').remove();
    $('#arrow').remove();
    spancoCompInit.appendTo(spancoColumn);
    spancoArrowsInit.appendTo(spancoColumn);
    initFleches();
    rightBorder(spancoColumn);
    leftBorder(spancoColumn);
    $('#date').append(data[0]['date']);

}

function initFleches() {
    $('#arrowRight').click(() => {   
        let spancoCompany = $('#logo').clone();
        let arrows = $('#arrow').clone();
        spancoColumn = $('#logo').parent().attr('id');
        rowColumn = spancoColumn.charAt(spancoColumn.length-1);
        $('#logo').remove();
        $('#arrow').remove();
        rowColumn = parseInt(rowColumn) + 1;
        spancoColumn = '#' + spancoColumn.slice(0, -1) + rowColumn;
        spancoCompany.appendTo(spancoColumn);
        arrows.appendTo(spancoColumn);
        $('#arrowLeft').attr('style', 'display : inline');
        initFleches();
        rightBorder(spancoColumn);
    })
    
    $('#arrowLeft').click(() => {   
        let spancoCompany = $('#logo').clone();
        let arrows = $('#arrow').clone();
        spancoColumn = $('#logo').parent().attr('id');
        let rowColumn = spancoColumn.charAt(spancoColumn.length-1);
        $('#logo').remove();
        $('#arrow').remove();
        rowColumn = parseInt(rowColumn) - 1;
        spancoColumn = '#' + spancoColumn.slice(0, -1) + rowColumn;
        spancoCompany.appendTo(spancoColumn);
        arrows.appendTo(spancoColumn);
        $('#arrowRight').attr('style', 'display : inline');
        initFleches();
        leftBorder(spancoColumn);
    
    })
}

function leftBorder (column) {
    if (column == "#colonne0") {
        $('#arrowLeft').attr('style', 'display : none');
    }
}

function rightBorder (column) {
    if (column == "#colonne5") {
        $('#arrowRight').attr('style', 'display : none');
    }
}

function modifyLogo (column) {
    if (column == "#colonne1") {

    }
    else if (column == "#colonne2") {
        
    }
    else if (column == "#colonne3") {
        
    }
    else if (column == "#colonne4") {
        
    }
    else if (column == "#colonne5") {
        
    }
    else if (column == "#colonne6") {
        
    }else {
        alert('Erreur !');
    }
}

$('#envoyer').click((event) => { 
    event.preventDefault();
        $.ajax({
            type: 'GET',
            url: '../php/action_company.php',
            dataType: 'json',
            data : {
              siret : siretUrl,
              spanco : rowColumn,
              action : 'modifier',
            },
            success: (data) => {
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

initFleches();