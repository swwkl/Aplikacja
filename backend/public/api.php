<?php
// Allow all origins (for development)
header("Access-Control-Allow-Origin: *");

// Allow specific methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow custom headers
header("Access-Control-Allow-Headers: *");

require 'functions.php';
require 'database.php';

$method = $_SERVER['REQUEST_METHOD'];

$request = isset($_GET['request']) ? explode('/', trim($_GET['request'], '/')) : [];

$db = new Database();

if ($request[0] === "register" && $method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $pwd = $data["password"];
    if($db->createUser($email, $pwd)){
        sendJsonResponse(["message" => "User created successfully!"]);
    }else{
        sendJsonResponse(["message" => "User creation failed!"]);
    }
}
else if ($request[0] === "register" && $method === "GET") {
    sendJsonResponse(["message" => "Register GET works!"]);
}else if ($request[0] === "login" && $method === "GET") {
     sendJsonResponse(["message" => "Login GET works!"]);
}else if ($request[0] === "login" && $method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"];
    $pwd = $data["password"];
    $user = $db->getUser($email);

    if(!$user){
        sendJsonResponse(["message" => "User does not exist!"]);
        exit();
    }

    $userPassword = $user["password"];

    if($userPassword == $pwd){
        sendJsonResponse(["message" => "User logged in!"]);
    }else{
        sendJsonResponse(["message" => "Password does not match!"]);
    }

}else if ($request[0] === "logout" && $method === "POST"){
    sendJsonResponse(["message" => "User logged out!"]);
}
else if ($request[0] === "ToDoList" && $method === "GET"){
    $currentDayInMilliseconds = $_GET["currentDay"];
    $currentDayInSeconds = floor($currentDayInMilliseconds / 1000);
    $currentDay = gmdate("Y-m-d", $currentDayInSeconds);
    $toDos = $db->getToDos($currentDay);

    sendJsonResponse(["message" => $toDos]);
}

else{
    sendJsonResponse(["message" => "No such endpoint!"]);
}


?>