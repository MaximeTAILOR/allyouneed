<?php

session_start();

include './conn_db.php';

if (!isset($_SESSION['type'])) { //Pour savoir qui est connecté
    $table = array(
        'error'  => true,
        'message' => "Vous n'êtes pas connecté.",
    );
    $table_encode = json_encode($table);
    echo $table_encode;
    die();
}

if ($_SESSION['type'] == "admin"){
    $table = array();
    $sql = "SELECT * FROM company INNER JOIN contact on company.idcompany = contact.idcompany";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idcontact' => $row['idcontact'],
                'idcompany' => $row['idcompany'],
                'nom' => $row['name_contact'],
                'prenom' => $row['fname_contact'],
                'num' => $row['num_contact'],
                'job' => $row['job_contact'],
                'email' => $row['email_contact'],
                'siret' => $row['siret_company'],
                'siren' => $row['siren_company'],
                'ape' => $row['ape_company'],
                'company' => $row['name_company'],
                'password' => $row['password_contact'],
            ));
        }
        echo json_encode($table);
    }
}elseif($_SESSION['type'] == "company"){
    $table = array();
    $sql = "SELECT * FROM company INNER JOIN contact on company.idcompany = contact.idcompany where idcontact='" . $_SESSION[ 'id_user'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'nom' => $row['name_contact'],
                'prenom' => $row['fname_contact'],
                'num' => $row['num_contact'],
                'job' => $row['job_contact'],
                'email' => $row['email_contact'],
                'siret' => $row['siret_company'],
                'siren' => $row['siren_company'],
                'ape' => $row['ape_company'],
                'company' => $row['name_company'],
                'password' => $row['password_contact'],
            ));
        }
        echo json_encode($table);
    }
}else{
    $table = array(
        'error'  => false,
        'message' => 'Vous ne pouvez pas voir les companies en tant que client',
    );
    $table_encode = json_encode($table);
    echo $table_encode;
}
?>