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
        $dbQuery->execute([$email]);
        return $dbQuery->fetch(PDO::FETCH_ASSOC);
    }

    public function getToDos($day) {
        $dbQuery = $this->pdo->prepare("SELECT * FROM todos WHERE DATE(creation_date) = ?");
        $dbQuery->execute([$day]);
        return $dbQuery->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getToDoById($id) {
        $dbQuery = $this->pdo->prepare("SELECT * FROM todos WHERE id = ?");
        $dbQuery->execute([$id]);
        return $dbQuery->fetch(PDO::FETCH_ASSOC);
    }
    
    public function updateToDo($id, $checked) {
        $dbQuery = $this->pdo->prepare("UPDATE todos SET isChecked = ? WHERE id = ?");
        return $dbQuery->execute([$checked, $id]);
    }

    public function deleteToDos($id) {
        $dbQuery = $this->pdo->prepare("DELETE FROM todos WHERE id = ?");
        return $dbQuery->execute([$id]);
    }

    public function createToDos($isChecked, $name, $date) {
        $dbQuery = $this->pdo->prepare("INSERT INTO todos (isChecked, name, creation_date) VALUES (?, ?, ?)");
        return $dbQuery->execute([$isChecked, $name, $date]);
    }

    public function updateStars($email, $numberOfStars) {
        $dbQuery = $this->pdo->prepare("UPDATE users SET stars_number = ? WHERE email = ?");
        return $dbQuery->execute([$numberOfStars, $email]);
    }
}
?>
