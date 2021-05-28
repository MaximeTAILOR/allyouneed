<?php
// au -> {aurelien, augustin};

session_start();

include './conn_db.php';

$table = array();
$firstname = $_GET['fname'];
$sql = "SELECT * from customer where fname_customer='" . $firstname . "'";
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
            'firstname' => $row['fname_customer'],
        ));
    }
    echo json_encode($table);
}
?>