<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Pobranie danych z żądania
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Połączenie z bazą danych
$link = new mysqli($data['host'], $data['user'], $data['pass'], $data['baza']);



// Wykonanie zapytania
$sql = $data['sql'];
$result = $link->query($sql);

if ($result === TRUE) {
    // Jeśli zapytanie to INSERT, zwróć ID ostatniego wstawionego rekordu
    echo json_encode(["success" => true, "insert_id" => $link->insert_id]);
}
// Zamknięcie połączenia
$link->close();
?>
