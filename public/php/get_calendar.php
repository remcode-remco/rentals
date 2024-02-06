<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  $calendar_url = $_POST['calendar_url'] ?? '';

  $calendar_data = file_get_contents('https://www.micazu.nl/ical/e53bf895-c195-46a4-9898-3ffad4c48194');

  echo $calendar_data;
?>