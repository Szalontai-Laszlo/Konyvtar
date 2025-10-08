<?php

require_once("../../common/php/environment.php");

$db = new Database("konyvtar");

$query = "SELECT `authors`.`name` AS 'Szerző',
                 `title` AS 'Cím',
                 `categories`.`name` AS 'Kategória',
                 `borrows`.`borrower_name` AS 'Kölcsönző Neve',
                 `borrows`.`borrow_date` AS 'Kölcsönzés Dátuma'
          FROM `books`

          JOIN `authors`
          ON `books`.`author_id` = `authors`.`id`
          
          JOIN `categories`
          ON `books`.`category_id` = `categories`.`id`

          JOIN `borrows`
          ON `books`.`id` = `borrows`.`book_id`";

$result = $db -> execute($query);

Util::setResponse($result);