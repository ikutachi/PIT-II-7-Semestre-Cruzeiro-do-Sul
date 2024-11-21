<?php
session_start();

$usersFile = "users.txt";

if (!file_exists($usersFile)) {
  file_put_contents($usersFile, "");
}

function readUsers()
{
  global $usersFile;
  $users = [];
  $file = fopen($usersFile, "r");

  while (($line = fgets($file)) !== false) {
    list($username, $password) = explode(",", trim($line));
    $users[$username] = $password;
  }

  fclose($file);
  return $users;
}

function writeUser($username, $password)
{
  global $usersFile;
  $file = fopen($usersFile, "a");
  fwrite($file, "$username,$password\n");
  fclose($file);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $action = $_POST["action"];
  $username = $_POST["username"] ?? null;
  $password = $_POST["password"] ?? null;

  if ($action === "check_login") {
    if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
      echo json_encode(["loggedIn" => true, "username" => $_SESSION["username"]]);
    } else {
      echo json_encode(["loggedIn" => false]);
    }
    exit;
  }

  if (empty($username) || empty($password)) {
    echo json_encode(["error" => "Usuário e senha não preenchidos"]);
    exit;
  }

  $users = readUsers();

  if ($action === "register") {
    if (array_key_exists($username, $users)) {
      echo json_encode(["error" => "Usuário já existe"]);
    } else {
      writeUser($username, $password);
      echo json_encode(["message" => "Registro feito com sucesso!"]);
    }
  } elseif ($action === "login") {
    if (isset($users[$username]) && $users[$username] === $password) {
      $_SESSION["logged_in"] = true;
      $_SESSION["username"] = $username;
      echo json_encode(["message" => "Login bem-sucedido"]);
    } else {
      echo json_encode(["error" => "Usuário ou senha inválidos"]);
    }
  } else {
    echo json_encode(["error" => "inválida"]);
  }
}
