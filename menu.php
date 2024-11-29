<?php
// menu.php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Your existing PHP code to handle the request
    header("Content-Type: application/json");

    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $link = new mysqli($data['host'], $data['user'], $data['pass'], $data['baza']);

    $sql = $data['sql'];
    $result = $link->query($sql);
    $dane =[];
    while($row = $result->fetch_object()){
        $dane[] = $row;
    }
    echo json_encode($dane);

    $link->close();

?>