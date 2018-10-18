<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InsertTasksIntoTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Illuminate\Support\Facades\DB::table('tasks')->insert([
           ['title' => 'Task1', 'status' => 0, 'priority' => 1],
           ['title' => 'Task2', 'status' => 0, 'priority' => 2],
           ['title' => 'Task3', 'status' => 0, 'priority' => 3],
           ['title' => 'Task4', 'status' => 0, 'priority' => 4],
           ['title' => 'Task5', 'status' => 0, 'priority' => 5],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Illuminate\Support\Facades\DB::table('tasks')->delete();
    }
}
