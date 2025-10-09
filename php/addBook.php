<?php

require_once("../../common/php/environment.php");

$db = new Database("konyvtar");

$args = Util::getArgs();

$query = "SELECT `name` FROM `authors` WHERE `name` = :author";

$result = $db -> execute($query, $args);

if(!$result)
{
	$query = "INSERT INTO `authors`(`name`) VALUES (':author')";
	
	$result = $db -> execute($query, $args);
}

$query = "SELECT `name` FROM `categories` WHERE `name` = :category";

$result = $db -> execute($query, $args);

if(!$result)
{
	$query = "INSERT INTO `categories`(`name`) VALUES (':category')";
	
	$result = $db -> execute($query, $args);
}

$query = "SELECT `title` FROM `books` WHERE `title` = :title";

$result = $db -> execute($query, $args);

if($result)
{
	Util::setError();
}

if(!$result)
{
	$query = "UPDATE `books` SET `title`= :title, `author_id`= SELECT `id` FROM `authors` WHERE `name` = :author, `category_id` = SELECT `id` WHERE `name` = :category";
	
	$result = $db -> execute($query, $args);
}

$db = null;

Util::setResponse();