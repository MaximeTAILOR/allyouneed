<?php

session_start();

include './conn_db.php';

if (!isset($_SESSION['type'])) { //Pour savoir qui est connecté
    $table = array(
        'error'  => true,
        'message' => "Vous n'êtes pas connecter.",
    );
    $table_encode = json_encode($table);
    echo $table_encode;
    die();
}

if ($_SESSION['type'] == "admin"){
    $table = array();
    $sql = "SELECT * FROM customer";
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
                'id' => $row['idcustomer'],
                'nom' => $row['name_customer'],
                'prenom' => $row['fname_customer'],
                'num' => $row['num_customer'],
                'email' => $row['email_customer'],
                'statut' => $row['status_customer'],
                'fonction' => $row['job_customer'],
                'company' => $row['last_company'],
                'password' => $row['password_customer'],
            ));
        }
        echo json_encode($table);
    }
}elseif($_SESSION['type'] == "customer"){
    $table = array();
    $sql = "SELECT * FROM customer where idcustomer='" . $_SESSION[ 'id_user'] . "'";
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
                'nom' => $row['name_customer'],
                'prenom' => $row['fname_customer'],
                'num' => $row['num_customer'],
                'email' => $row['email_customer'],
                'statut' => $row['status_customer'],
                'fonction' => $row['job_customer'],
                'company' => $row['last_company'],
                'password' => $row['password_customer'],
            ));
        }
        $table_encode = json_encode($table);
        echo $table_encode;
    }
}
?>