<?php

session_start();

include './conn_db.php';

if ($_GET['action'] == 'afficher') {
    $siret = htmlspecialchars($_GET['siret']);
    $sql = "SELECT * from company where siret_company='" . $siret . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } else {
        $table = array();

        while ($row = mysqli_fetch_assoc($resultat)) {
            $date = date_create($row['date_company']);
            $date = date_format($date, 'd-m-Y');
            array_push($table, array(
                'id' => $row['idcompany'],
                'siret' => $row['siret_company'],
                'siren' => $row['siren_company'],
                'ape' => $row['ape_company'],
                'name' => $row['name_company'],
                'type' => $row['type_company'],
                'date' => $date,
                'origin' => $row['origin_company'],
                'grade' => $row['grade_company'],
                'spanco' => $row['spanco_company']
            ));
        }
        echo json_encode($table, JSON_UNESCAPED_UNICODE);
    }
} elseif ($_GET['action'] == 'ajouter') {
    $sql = "SELECT * from company where siret_company='" . $_GET['siret'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) { // S'il y a une erreur dans la requête sql
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } elseif (mysqli_num_rows($resultat) == 1) {
        $table = array(
            'error'  => true,
            'message' => "L'entreprise existe déjà dans la base de données",
        );
        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } else {
        $siret = htmlspecialchars($_GET['siret']);
        $siren = htmlspecialchars($_GET['siren']);
        $ape = htmlspecialchars($_GET['ape']);
        $entreprise = htmlspecialchars(addslashes($_GET['nomEntreprise']));
        $type = htmlspecialchars(addslashes($_GET['type']));
        $date = date_create($_GET['date']);
        $date = date_format($date, 'Y-m-d');
        $origin = htmlspecialchars(addslashes($_GET['origin']));
        $grade = $_GET['grade'];
        $spanco = 0;

        $sql = "INSERT INTO company (siret_company, siren_company, ape_company, name_company, type_company, date_company, origin_company, grade_company, spanco_company) values ('" . $siret . "', '" . $siren . "', '" . $ape . "', '" . $entreprise . "', '" . $type . "', '" . $date . "', '" . $origin . "', '" . $grade . "', '" . $spanco . "')";
        $resultat = mysqli_query($conn, $sql);
        if ($resultat == FALSE) {
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête ' . $sql,
            );

            $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
            echo $table_encode;
        } else {
            $table = array(
                'error'  => false,
                'message' => 'L\'entreprise a été ajoutée',
            );

            $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
            echo $table_encode;
        }
    }
} elseif ($_GET['action'] == 'modifier') {
    $siret = htmlspecialchars($_GET['siret']);
    $siren = htmlspecialchars($_GET['siren']);
    $ape = htmlspecialchars($_GET['ape']);
    $entreprise = htmlspecialchars(addslashes($_GET['nomEntreprise']));
    $type = htmlspecialchars(addslashes($_GET['type']));
    $date = date_create($_GET['date']);
    $date = date_format($date, 'Y-m-d');
    $origin = addslashes($_GET['origin']);
    $grade = $_GET['grade'];
    $spanco = $_GET['spanco'];

    $sql = "UPDATE company SET siret_company='" . $siret . "', siren_company='" . $siren . "', ape_company='" . $ape . "', name_company='" . $entreprise . "', type_company='" . $type . "', date_company='" . $date . "', origin_company='" . $origin . "', grade_company='" . $grade . "', spanco_company='" . $spanco . "' WHERE siret_company='" . $siret . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );

        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'L\'entreprise a été modifiée',
        );

        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    }
} elseif ($_GET['action'] == 'supprimer') {
    $siret = htmlspecialchars($_GET['siret']);
    $sql = "DELETE FROM company WHERE siret_company='" . $siret . "'";
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );

        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'L\'entreprise a été supprimée',
        );

        $table_encode = json_encode($table, JSON_UNESCAPED_UNICODE);
        echo $table_encode;
    }
}
