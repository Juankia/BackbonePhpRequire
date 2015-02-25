<?php
function getConnection() {
	$dbh=null;
	try{

		//$url=parse_url(getenv("CLEARDB_DATABASE_URL"));
		
		$db_username="root";
		$db_password ="root";
	
		$dbh = new PDO("mysql:dbname=shefali;host=127.0.0.1;port=3306", $db_username,$db_password);
		$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	}catch(PDOException $e){
				echo "Error " .$e->getMessage();
	}		
	return $dbh;
}

?>