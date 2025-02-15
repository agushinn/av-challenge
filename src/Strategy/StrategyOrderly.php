<?php
namespace App\Strategy;

class StrategyOrderly
{
    public function sort($firstArray, $secondArray)
    {
        $orderedArray = array_merge($firstArray, $secondArray);
        return $orderedArray;
    }
}