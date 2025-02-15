<?php
// return [
//     'db' => [
//         'host' => 'localhost',
//         'port' => '3306',
//         'user' => 'root',
//         'password' => '',
//         'database' => 'avature',
//     ],
// ];

return [
    'db' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'port' => getenv('DB_PORT') ?: '3306',
        'user' => getenv('DB_USER') ?: 'root',
        'password' => getenv('DB_PASSWORD') ?: '',
        'database' => getenv('DB_DATABASE') ?: 'avature',
    ],
];
