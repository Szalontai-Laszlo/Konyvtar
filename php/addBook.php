<?php

require_once("../../common/php/environment.php");

$db = new Database("konyvtar");

$argsBase = Util::getArgs();

$args = ['author' => $argsBase['author']];
$query = "SELECT `name` FROM `authors` WHERE `name` = :author";

$result = $db -> execute($query, $args);

if(!$result)
{
	$query = "INSERT INTO `authors`(`name`) VALUES (:author)";
	
	$result = $db -> execute($query, $args);
}

$args = ['category' => $argsBase['category']];
$query = "SELECT `name` FROM `categories` WHERE `name` = :category";

$result = $db -> execute($query, $args);

if(!$result)
{
	$query = "INSERT INTO `categories`(`name`) VALUES (:category)";
	
	$result = $db -> execute($query, $args);
}

$args = ['title' => $argsBase['title']];
$query = "SELECT `title` FROM `books` WHERE `title` = :title";

$result = $db -> execute($query, $args);

if($result)
{
	Util::setError('Van már ilyen könyv');
}

if(!$result)
{
	$args = $argsBase;

	$query = "INSERT INTO `books` (`title`,`author_id`,`category_id`) VALUES (:title, (SELECT `id` FROM `authors` WHERE `name` = :author), (SELECT `id` FROM `categories` WHERE `name` = :category))";
	
	$result = $db -> execute($query, $args);
}

$db = null;

Util::setResponse();