<?php

use PHPUnit\Framework\TestCase;

require_once('./src/flatten.php');

class FlattenTest extends TestCase
{
    public function testFlattenSuccess(): void
    {
        $input = [
            [0, 1],
            [2, 3],
            [4, 5],
            [6, 7],
            [8, 9],
        ];

        $result = flatten($input);
        $expectedResult = range(0, 9);

        $this->assertNotEquals($expectedResult, $input);
        $this->assertIsArray($result);
        $this->assertCount(10, $result);
        $this->assertEquals($expectedResult, $result);
    }

    public function testFlattenFailure(): void
    {
        $input = "[0, [1, 2], [3, 4, 5]]";

        $this->expectException(TypeError::class);
        flatten($input);
    }
}