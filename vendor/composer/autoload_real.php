<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit2e0f89db97a4190ea9f3ee47f086d93a
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInit2e0f89db97a4190ea9f3ee47f086d93a', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit2e0f89db97a4190ea9f3ee47f086d93a', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit2e0f89db97a4190ea9f3ee47f086d93a::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
