<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase
{
    public function testInsert(): void
    {
        $temp1 = 15;
        $tempTracker = new TempTracker();
        $tempTracker->insert($temp1);

        $this->assertEquals([$temp1], $tempTracker->get_temps());

        $temp2 = 10;
        $temp3 = 30;
        $tempTracker->insert($temp2);
        $tempTracker->insert($temp3);

        $this->assertEquals([$temp1, $temp2, $temp3], $tempTracker->get_temps());
    }

    public function testInsertOutOfBounds(): void
    {
        $temp1OutOfBounds = -13;
        $tempTracker = new TempTracker();

        $this->expectException(ValueError::class);
        $tempTracker->insert($temp1OutOfBounds);

        $temp2OutOfBounds = 231;

        $this->expectException(ValueError::class);
        $tempTracker->insert($temp2OutOfBounds);
    }

    public function testInsertWrongTyping(): void
    {
        $wrongInput1 = 'temperature';
        $tempTracker = new TempTracker();

        $this->expectException(TypeError::class);
        $tempTracker->insert($wrongInput1);

        $wrongInput2 = '15';
        $this->expectException(TypeError::class);
        $tempTracker->insert($wrongInput2);
    }

    public function testGetMin(): void
    {
        $minTemp = 10;
        $temp = 20;
        $maxTemp = 30;

        $tempTracker = new TempTracker();
        $tempTracker->insert($minTemp);
        $tempTracker->insert($temp);
        $tempTracker->insert($maxTemp);

        $this->assertEquals($minTemp, $tempTracker->get_min());
    }

    public function testGetMax(): void
    {
        $minTemp = 10;
        $temp = 20;
        $maxTemp = 30;

        $tempTracker = new TempTracker();
        $tempTracker->insert($minTemp);
        $tempTracker->insert($temp);
        $tempTracker->insert($maxTemp);

        $this->assertEquals($maxTemp, $tempTracker->get_max());
    }

    public function testGetMean(): void
    {
        $minTemp = 10;
        $temp = 20;
        $maxTemp = 30;
        $temps = [$minTemp, $temp, $maxTemp];

        $tempTracker = new TempTracker();
        $tempTracker->insert($minTemp);
        $tempTracker->insert($temp);
        $tempTracker->insert($maxTemp);

        $this->assertEquals(array_sum($temps) / count($temps), $tempTracker->get_mean());
    }

}