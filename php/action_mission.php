<?php

session_start();

include './conn_db.php';

if ($_GET['action'] == 'afficher') {
    $sql = "SELECT * from mission where siret_company='" . $_GET['siret'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    } else {
        $table = array();
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idmission' => $row['idmission'],
                'manager' => $row['manager_mission'],
                'post' => $row['post_mission'],
                'current' => $row['current_mission'],
                'meeting' => $row['meeting_mission'],
                'endorsed' => $row['endorsed_mission'],
                'opendate' => $row['opendate_mission'],
                'enddate' => $row['enddate_mission'],
                'turnover' => $row['turnover_mission'],
            ));
        }
        echo json_encode($table, JSON_INVALID_UTF8_IGNORE);
    }
} elseif ($_GET['action'] == 'ajouter') {
    $siret = htmlspecialchars($_GET['siret']);
    $manager = htmlspecialchars(addslashes($_GET['manager']));
    $post = htmlspecialchars(addslashes($_GET['post']));
    $current = htmlspecialchars(addslashes($_GET['current']));
    $meeting = htmlspecialchars(addslashes($_GET['meeting']));
    $endorsed = htmlspecialchars(addslashes($_GET['endorsed']));
    $opendate = htmlspecialchars($_GET['opendate']);
    $enddate = htmlspecialchars($_GET['enddate']);
    $turnover = htmlspecialchars($_GET['turnover']);

    $sql = "INSERT INTO mission (siret_company, manager_mission, post_mission, current_mission, meeting_mission, endorsed_mission, opendate_mission, enddate_mission, turnover_mission) values ('" . $siret . "', '" . $manager . "', '" . $post . "', '" . $current . "', '" . $meeting . "', '" . $endorsed . "', '" . $opendate . "', '" . $enddate . "', '" . $turnover . "')";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );

        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'La misison a été ajoutée',
        );

        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    }
} elseif ($_GET['action'] == 'modifier') {
    $idmission = htmlspecialchars($_GET['idmission']);
    $manager = htmlspecialchars(addslashes($_GET['manager']));
    $post = htmlspecialchars(addslashes($_GET['post']));
    $current = htmlspecialchars(addslashes($_GET['current']));
    $meeting = htmlspecialchars(addslashes($_GET['meeting']));
    $endorsed = htmlspecialchars(addslashes($_GET['endorsed']));
    $opendate = htmlspecialchars($_GET['opendate']);
    $enddate = htmlspecialchars($_GET['enddate']);
    $turnover = htmlspecialchars($_GET['turnover']);

    $sql = "UPDATE mission SET manager_mission='" . $manager . "', post_mission='" . $post . "', current_mission='" . $current . "', meeting_mission='" . $meeting . "', endorsed_mission='" . $endorsed . "', opendate_mission='" . $opendate . "', enddate_mission='" . $enddate . "', turnover_mission='" . $turnover . "' WHERE idmission=" . $idmission;
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );

        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'La mission a été modifiée',
        );

        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    }
} elseif ($_GET['action'] == 'supprimer') {
    $sql = "DELETE FROM mission WHERE idmission='" . $_GET['idmission'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );

        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    } else {
        $table = array(
            'error'  => false,
            'message' => 'La mission a été supprimée',
        );

        $table_encode = json_encode($table, JSON_INVALID_UTF8_IGNORE);
        echo $table_encode;
    }
}
