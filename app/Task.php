<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Task extends Model
{
    /**
     * Get a Task with id
     *
     * @param  int $taskId
     * @return self
     */
    private static function getTask(int $taskId): self
    {
        return static::find($taskId);
    }

    /**
     * Change status of a Task
     *
     * @param  array $data
     * @return bool
     */
    public static function changeStatus(array $data): bool
    {
        $task = static::find($data['taskId']);
        $task->status = $data['status'];
        if ($task->save()) {
            return true;
        }
        return false;
    }

    /**
     * Change priority of a Task
     *
     * @param  array $data
     * @return bool
     */
    public static function changePriority(array $data): bool
    {
        $stored = DB::transaction(function () use ($data) {
            $task = static::getTask($data['taskId']);
            $task->priority = $data['taskPriority'];
            $task->save();

            foreach ($data['otherTasksIds'] as $taskId) {
                $task = static::getTask($taskId);
                $newPriority = $task->priority + 1;
                $task->priority = $newPriority;
                $task->save();
            }
        });

        if ($stored === null) {
            return true;
        }
        return false;

    }
}
