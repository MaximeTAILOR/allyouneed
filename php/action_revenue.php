<?php

session_start();

include './conn_db.php';
include './utf8.php';

if ($_GET['action'] == 'afficher') {
    $sql = "SELECT * from revenue where siret_company='" . $_GET['siret'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $table = array();
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idrevenue' => $row['idrevenue'],
                'siret' => $row['siret_company'],
                'salary' => $row['salary_revenue'],
                'percentage' => $row['percentage_revenue'],
                'turnover' => $row['turnover_revenue'],
                'total' => $row['total_revenue'],
            ));
        }
        echo json_encode(utf8ize($table));
    }
} elseif ($_GET['action'] == 'ajouter') {
    $siret = htmlspecialchars($_GET['siret']);
    $salary = htmlspecialchars($_GET['salary']);
    $percentage = htmlspecialchars($_GET['percentage']);
    $turnover = htmlspecialchars($_GET['turnover']);
    $total = htmlspecialchars($_GET['total']);

    $sql = "INSERT INTO revenue (siret_company, salary_revenue, percentage_revenue, turnover_revenue, total_revenue) values ('" . $siret . "', '" . $salary . "', '" . $percentage . "', '" . $turnover . "', '" . $total . "')";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );

        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'Le CA a été ajouté',
        );
        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }
} elseif ($_GET['action'] == 'modifier') {
    $idrevenue = htmlspecialchars($_GET['idrevenue']);
    $salary = htmlspecialchars($_GET['salary']);
    $percentage = htmlspecialchars($_GET['percentage']);
    $turnover = htmlspecialchars($_GET['turnover']);
    $total = htmlspecialchars($_GET['total']);

    $sql = "UPDATE revenue SET salary_revenue='" . $salary . "', percentage_revenue='" . $percentage . "', turnover_revenue='" . $turnover . "', total_revenue='" . $total . "' WHERE idrevenue='" . $idrevenue . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );

        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'Le CA a été modifié',
        );

        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }
} elseif ($_GET['action'] == 'supprimer') {
    $sql = "DELETE FROM revenue WHERE idrevenue='" . $_GET['idrevenue'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );

        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'Le CA a été supprimé',
        );

        $table_encode = json_encode(utf8ize($table));
        echo $table_encode;
    }
}
