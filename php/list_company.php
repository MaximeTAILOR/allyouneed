<?php

session_start();

include './conn_db.php';

if (!isset($_SESSION['type'])) { //Pour savoir qui est connecté
    $table = array(
        'error'  => true,
        'message' => "Vous n'êtes pas connecté.",
    );
    $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
    echo $table_encode;
    die();
}

if ($_SESSION['type'] == "admin") {
    $table = array();
    $sql = "SELECT * FROM company";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête ' . $sql,
        );
        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    } else {
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idcompany' => $row['idcompany'],
                'siret' => $row['siret_company'],
                'ape' => $row['ape_company'],
                'name' => $row['name_company'],
                'date' => $row['date_company'],
                'grade' => $row['grade_company'],
                'type' => $row['type_company'],
            ));
        }
        echo json_encode($table, JSON_INVALID_UTF8_IGNORE);
    }
} elseif ($_SESSION['type'] == "company") {
    $table = array();
    $sql = "SELECT * FROM company INNER JOIN contact on company.siret_company = contact.siret_company where company.siret_company='" . $_SESSION['siret_user'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );
        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    } else {
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idcompany' => $row['idcompany'],
                'siret' => $row['siret_company'],
                'ape' => $row['ape_company'],
                'name' => $row['name_company'],
                'date' => $row['date_company'],
                'grade' => $row['grade_company'],
                'type' => $row['type_company'],
                'typeUser' => 'company',
            ));
        }
        echo json_encode($table, JSON_INVALID_UTF8_IGNORE);
    }
} else {
    $table = array(
        'error'  => false,
        'message' => 'Vous ne pouvez pas voir les companies en tant que client',
    );
    $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
    echo $table_encode;
}
