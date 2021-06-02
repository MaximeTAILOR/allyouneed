<?php

session_start();

include './conn_db.php';

if($_GET['action'] == 'afficher'){
    $sql = "SELECT * from revenue where idcompany='" . $GET['idcompany'] . "'";
    $resultat = mysqli_query($conn, $sql);
    if ($resultat == FALSE) {
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête',
        );
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        $table = array();
        while ($row = mysqli_fetch_assoc($resultat)) {
            array_push($table, array(
                'idrevenue' => $row['idrevenue'],
                'salary' => $row['salary_revenue'],
                'percentage' => $row['percentage_revenue'],
                'turnover' => $row['current_revenue'],
                'total' => $row['total_revenue'],
            ));
        }
        echo json_encode($table);
    }
}elseif($_GET['action'] == 'ajouter'){
        $salary = htmlspecialchars($_GET['salary']);
        $percentage = htmlspecialchars($_GET['percentage']);
        $current = htmlspecialchars($_GET['current']);
        $total = htmlspecialchars($_GET['total']);

        $sql = "INSERT INTO revenue (salary_revenue, percentage_revenue, current_revenue, total_revenue) values ('" . $salary . "', '" . $percentage . "', '" . $current . "', '" . $total . "')";
        $resultat = mysqli_query($conn, $sql);
        if($resultat == FALSE){
            $table = array(
                'error'  => true,
                'message' => 'Erreur d\'execution de la requête' . $sql,
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }else{
            $table = array(
                'error'  => false,
                'message' => 'Le contact a été ajouté',
            );
            
            $table_encode = json_encode($table);
            echo $table_encode;
        }

}elseif($_GET['action'] == 'modifier'){
    $salary = htmlspecialchars($_GET['salary']);
    $percentage = htmlspecialchars($_GET['percentage']);
    $current = htmlspecialchars($_GET['current']);
    $total = htmlspecialchars($_GET['total']);

    $sql = "UPDATE revenue SET salary_revenue='" . $salary . "', percentage_revenue='" . $percentage . "', current_revenue='" . $current . "', total_revenue='" . $total . "' WHERE idrevenue='" . $idrevenue . "'";
    $resultat = mysqli_query($conn, $sql);
    if($resultat == FALSE){
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );
        
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        $table = array(
            'error'  => false,
            'message' => 'Le contact a été modifié',
        );
        
        $table_encode = json_encode($table);
        echo $table_encode;
    }

}elseif($_GET['action'] == 'supprimer'){
    $sql = "DELETE FROM revenue WHERE idrevenue='" . $_GET['idrevenue'] . "'";
    if($resultat == FALSE){
        $table = array(
            'error'  => true,
            'message' => 'Erreur d\'execution de la requête' . $sql,
        );
        
        $table_encode = json_encode($table);
        echo $table_encode;
    }else{
        $table = array(
            'error'  => false,
            'message' => 'Le contact a été supprimé',
        );
        
        $table_encode = json_encode($table);
        echo $table_encode;
    }
}

?>