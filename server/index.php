<?php
require "includes/index.php";
require_once "Slim/Slim.php";

$data = new Slim();


$data->get('/books/search',  function () use ($data) {
		$query = $data->request()->params('name');
		findByName($query);
});
//VINOS 
$data->get('/books/buscarVinos',  function () use ($data) {
		$query = $data->request()->params('name');
		findVinoByName($query);
});


$data->get('/books/', 'getBooks');
$data->get('/books/:id', 'getBook');
$data->get('/wines', 'getWines');
//$data->get('/books/search:query', 'findByName');
$data->post('/books', 'addBook');
$data->put('/books/:id', 'updateBook');
$data->delete('/books/:id',	'deleteBook');


$data->run();

function getBooks() {
	$sql = "select * FROM books ORDER BY id DESC";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$books = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($books);
		return "ok";
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getWines() {
	$sql = "select * FROM wine ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($wines);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getBook($id) {
	$id = clean($id);
	$query = "SELECT * FROM books WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($query);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$book = $stmt->fetchObject();  
		$db = null;
		echo json_encode($book); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addBook() {
	
	$request = Slim::getInstance()->request();
	$book = json_decode($request->getBody());
	$query = "INSERT INTO books (name, author, status) VALUES (:name, :author, :status)";
	try {
		$name = clean($book->name);
		$author = clean($book->author);
		$status = clean($book->status);
		$db = getConnection();
		$sql = $db->prepare($query);  
		$sql->bindParam("name", $name);
		$sql->bindParam("author", $author);
		$sql->bindParam("status", $status);
		$sql->execute();
		$book->id = $db->lastInsertId();
		$id = $db->lastInsertId();
		$db = null;
		 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function updateBook($id) {
	
	$id = clean($id);
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$book = json_decode($body);
	$query = "UPDATE books set name=:name, author=:author, status=:status WHERE id=:id";
		$name = clean($book->name);
		$author = clean($book->author);
		$status = clean($book->status);
	try {
		$db = getConnection();
		$sql = $db->prepare($query);  
		$sql->bindParam("name", $name);
		$sql->bindParam("author", $author);
		$sql->bindParam("status", $status);
		$sql->bindParam("id", $id);
		$sql->execute();
		$db = null;
		echo json_encode($book); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function deleteBook($id) {
	$id = clean($id);
	$query = "DELETE FROM books WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($query);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$query = clean($query);
	$sql = "SELECT * FROM books WHERE UPPER(name) LIKE :query  or UPPER(author) LIKE :query  order by name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$books = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($books);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
//VINOS
function findVinoByName($query) {
	$query = clean($query);
	$sql = "SELECT * FROM wine WHERE UPPER(name) LIKE :query  or UPPER(grapes) LIKE :query  order by name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$books = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($books);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function clean($str)
{
	$str = trim($str);
	$str = htmlentities($str);
	return $str;
	
}

?>