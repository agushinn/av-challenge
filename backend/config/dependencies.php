<?php

use DI\Container;
use App\Database\Database;
use App\Repositories\JobRepository;
use App\Repositories\JobExternalRepository;
use App\Repositories\SkillRepository;
use App\Repositories\UserRepository;
use App\Services\JobService;
use App\Services\JobExternalService;
use App\Services\SearchService;
use App\Services\AlertService;
use App\Services\SkillService;
use App\Services\UserService;

return [
    // Database configuration
    Database::class => function (Container $c) {
        $config = require __DIR__ . '/database.php';
        return new Database($config['db']);
    },

    // Repositories
    JobRepository::class => function (Container $c) {
        return new JobRepository($c->get(Database::class));
    },
    JobExternalRepository::class => function (Container $c) {
        return new JobExternalRepository();
    },
    SkillRepository::class => function (Container $c) {
        return new SkillRepository($c->get(Database::class));
    },
    UserRepository::class => function (Container $c) {
        return new UserRepository($c->get(Database::class));
    },

    // Services
    JobService::class => function (Container $c) {
        return new JobService(
            $c->get(JobRepository::class),
            $c->get(AlertService::class),
            $c->get(UserService::class)
        );
    },
    JobExternalService::class => function (Container $c) {
        return new JobExternalService(
            $c->get(JobExternalRepository::class)
        );
    },
    SearchService::class => function (Container $c) {
        return new SearchService(
            $c->get(JobService::class),
            $c->get(JobExternalService::class)
        );
    },
    AlertService::class => function (Container $c) {
        return new AlertService();
    },
    SkillService::class => function (Container $c) {
        return new SkillService(
            $c->get(SkillRepository::class)
        );
    },
    UserService::class => function (Container $c) {
        return new UserService(
            $c->get(UserRepository::class)
        );
    },
];