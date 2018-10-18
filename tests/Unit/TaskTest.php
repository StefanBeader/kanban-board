<?php

namespace Tests\Unit;

use Tests\TestCase;

class TaskTest extends TestCase
{
    /**
     * Test if there is a Task in table
     *
     * @return void
     */
    public function testIfTaskExists()
    {
        $this->assertDatabaseHas('tasks',[
            'title' => 'Task1'
        ]);
    }
}
