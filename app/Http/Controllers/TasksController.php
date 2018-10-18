<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TasksController extends Controller
{
    public function getTasks(): Collection
    {
        return Task::orderBy('priority')->get();
    }

    public function changeStatus(Request $request): Response
    {
        if (Task::changeStatus($request->all())) {
            return response('ok', 200);
        }
        return response('error', 500);
    }

    public function changePriority(Request $request): Response
    {
        if (Task::changePriority($request->all())) {
            return response('success', 200);
        }
        return response('error', 500);
    }
}
