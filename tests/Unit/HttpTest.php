<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class HttpTest extends TestCase
{
    /**
     * Test if index route leads to index view
     *
     * @return void
     */
    public function testView()
    {
        $response = $this->get('/');

        $response->assertViewIs('index');
    }
}
