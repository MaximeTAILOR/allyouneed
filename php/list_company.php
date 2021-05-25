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
    $sql = "SELECT * FROM company";
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
                'id' => $row['id_intermediaire'],
                'nom' => $row['name_intermediaire'],
                'prenom' => $row['fname_intermediaire'],
                'num' => $row['num_intermediaire'],
                'job' => $row['job_intermediaire'],
                'email' => $row['email_intermediaire'],
                'siret' => $row['siret_company'],
                'siren' => $row['siren_company'],
                'ape' => $row['ape_company'],
                'company' => $row['name_company'],
                'password' => $row['password_company'],
            ));
        }
        echo json_encode($table);
    }
}elseif($_SESSION['type'] == "company"){
    $table = array();
    $sql = "SELECT * FROM company where id_intermediaire='" . $_SESSION[ 'id_user'] . "'";
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
                'nom' => $row['name_intermediaire'],
                'prenom' => $row['fname_intermediaire'],
                'num' => $row['num_intermediaire'],
                'job' => $row['job_intermediaire'],
                'email' => $row['email_intermediaire'],
                'siret' => $row['siret_company'],
                'siren' => $row['siren_company'],
                'ape' => $row['ape_company'],
                'company' => $row['name_company'],
                'password' => $row['password_company'],
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