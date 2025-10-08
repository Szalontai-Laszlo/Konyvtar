<?php

require_once("../../common/php/environment.php");

$db = new Database("konyvtar");

$query = "SELECT `authors`.`name` AS 'szerzo',
                 `title` AS 'cim',
                 `categories`.`name` AS 'kategoria'
          FROM `books`

          JOIN `authors`
          ON `books`.`author_id` = `authors`.`id`
          
          JOIN `categories`
          ON `books`.`category_id` = `categories`.`id`";

$result = $db -> execute($query);

Util::setResponse($result);