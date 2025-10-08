<?php

require_once("../common/php/environment.php");

$db = new Database("konyvtar");

$query = "";

$result = $db -> execute($query);

Util::setResponse($result);