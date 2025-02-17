<?php 

namespace App\Strategy;

class StrategyInterspersed {
    public function  sort ($firstArray, $secondArray) {
        $randomizedArray = [];

        $mergedJobPosts = array_merge($firstArray, $secondArray);
        for ($i = 0; $i < count($mergedJobPosts); $i = $i + 2) {
            $counter = $i;
            $counterExternal = $i;

            if (count($firstArray) > $counter) {
                $randomizedArray[] = $firstArray[$counter];
            }
            if (count($firstArray) > $counter + 1) {
                $randomizedArray[] = $firstArray[++$counter];
            }
            if (count($secondArray) > $counterExternal) {
                $randomizedArray[] = $secondArray[$counterExternal];
            }
            if (count($secondArray) > $counterExternal + 1) {
                $randomizedArray[] = $secondArray[++$counterExternal];
            }
        }

        return $randomizedArray;
    }

}