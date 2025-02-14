<?php
// Allow all origins (for development)
header("Access-Control-Allow-Origin: *");

// Allow specific methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow custom headers
header("Access-Control-Allow-Headers: *");

require 'functions.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    sendJsonResponse(["message" => "Post works!"]);
}
if ($method === 'GET') {
    sendJsonResponse(["message" => "Get works!"]);
}

?>