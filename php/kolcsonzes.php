<?php

require_once("../../common/php/environment.php");

$db = new Database("konyvtar");

$query = "SELECT `borrows`.`borrower_name` AS 'kolcsonzo',
                 `authors`.`name` AS 'szerzo',
                 `title` AS 'cim',
                 `borrows`.`borrow_date` AS 'datum'
          FROM `books`

          JOIN `authors`
          ON `books`.`author_id` = `authors`.`id`
          
          JOIN `borrows`
          ON `books`.`id` = `borrows`.`book_id`";

$result = $db -> execute($query);

$db = null;

Util::setResponse($result);