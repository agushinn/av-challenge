<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2e0f89db97a4190ea9f3ee47f086d93a
{
    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2e0f89db97a4190ea9f3ee47f086d93a::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2e0f89db97a4190ea9f3ee47f086d93a::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2e0f89db97a4190ea9f3ee47f086d93a::$classMap;

        }, null, ClassLoader::class);
    }
}
