<?php
class Database {
    private $pdo;

    public function __construct() {
        $host = "mysql-db";
        $dbname = "todos_db";
        $username = "todo_user";
        $password = "todopass";

        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public function getConnection() {
        return $this->pdo;
    }

    public function createUser($email, $password) {
        $dbQuery = $this->pdo->prepare("INSERT INTO users (email, password) VALUES (?, ?)");
        return $dbQuery->execute([$email, $password]);
    }

    public function getUser($email) {
        $dbQuery = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $dbQuery->execute([$email])
        return $dbQuery->fetch(PDO::FETCH_ASSOC);
    }
}
?>
