<?php

// Simple router to include the requested file
$requestUri = $_SERVER['REQUEST_URI'];
$scriptName = $_SERVER['SCRIPT_NAME'];
$path = str_replace(dirname($scriptName), '', $requestUri);
$file = __DIR__ . $path;

if (file_exists($file) && is_file($file)) {
    include $file;
} else {
    http_response_code(404);
    echo "File not found.";
}
