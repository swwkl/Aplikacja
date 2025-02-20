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
else if($request[0] === "updateTodoStatus" && $method === "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $completed = $data["completed"];
    $email = $data["email"];

    $user = $db->getUser($email);
    $starsNumber = $user["stars_number"];

    if($completed){
        $starsNumber = $starsNumber + 1;
    }else{
        $starsNumber = $starsNumber - 1;
    }

    $db->updateStars($email, $starsNumber);

    if($db->updateToDo($id, $completed)){
        sendJsonResponse(["message" => "Update completed"]);
    }else{
        sendJsonResponse(["message" => "Update failed"]);
    }
}
else if($request[0] === "deleteToDos" && $method === "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data["id"];
    $email = $data["userEmail"];

    $toDo = $db->getToDoById($id);

    if((bool)$toDo["isChecked"]){
        $user = $db->getUser($email);
        $starsNumber = $user["stars_number"];
        $starsNumber = $starsNumber - 1;
        $db->updateStars($email, $starsNumber);
    }

    if($db->deleteToDos($id)){
        sendJsonResponse(["message" => "ToDos remove completed"]);
    }else{
        sendJsonResponse(["message" => "ToDos remove failed"]);
    }
}
else if($request[0] === "createToDos" && $method === "POST"){
    $data = json_decode(file_get_contents("php://input"), true);
    $isChecked = (int)$data["isChecked"];
    $name = $data["todoValue"];
    $date = date('Y-m-d H:i:s', $data["date"] / 1000);
    $email = $data["userEmail"];

    $user = $db->getUser($email);
    $starsNumber = $user["stars_number"];

    if($isChecked){
        $starsNumber = $starsNumber + 1;
    }

    $db->updateStars($email, $starsNumber);

    if($db->createToDos($isChecked, $name, $date)){
        sendJsonResponse(["message" => "ToDos create completed"]);
    }else{
        sendJsonResponse(["message" => "ToDos create failed"]);
    }
}
else if($request[0] === "stars" && $method === "GET"){
    $email = $_GET["email"];
    $user = $db->getUser($email);
    $starsNumber = $user["stars_number"];
    sendJsonResponse(["message" => $starsNumber]);
}
else{
    sendJsonResponse(["message" => "No such endpoint!"]);
}


?>