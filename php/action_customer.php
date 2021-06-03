<?php

session_start();

include './conn_db.php';
include './utf8.php';

if ($_GET['action'] == 'afficher') {
    $sql = "SELECT * from customer where idcustomer='" . $_GET['idcustomer'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error' => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $table = array();

        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idcustomer' => $row['idcustomer'],
                'name' => $row['name_customer'],
                'fname' => $row['fname_customer'],
                ''
            ));
        }
        echo json_encode(utf8ize($table));
    }
}
