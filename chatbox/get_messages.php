<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chat_app";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT username, message FROM messages ORDER BY created_at DESC";
$result = $conn->query($sql);

$messages = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }
}

$conn->close();
header('Content-Type: application/json');
echo json_encode($messages);
?>