<?php

require_once('../common/php/environment.php');

$db = new Database('konyvtar');

$args = Util::getArgs();

$query = '';

$result = $db->execute($query, $args);

$db = null;

Util::setResponse($result);