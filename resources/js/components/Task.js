import React, {Component} from 'react';
import axios from 'axios';

let el;
let parent;

class Task extends Component {

  onDragStart(ev) {
    ev.dataTransfer.setData("task", ev.target.id);
    el = ev.target;
    parent = ev.target.parentNode.parentNode;
  }

  onDragOver(ev) {
    ev.preventDefault();
    let dropOnTask = ev.target;

    if (parent.id === dropOnTask.parentNode.parentNode.id) {
      if (this.isBefore(el, ev.target))
        ev.target.parentNode.insertBefore(el, ev.target);
      else
        ev.target.parentNode.insertBefore(el, ev.target.nextSibling);
    }
  }

  onDragEnd() {
    el = null;
  }

  isBefore(el1, el2) {
    if (el2.parentNode === el1.parentNode)
      for (let cur = el1.previousSibling; cur; cur = cur.previousSibling)
        if (cur === el2)
          return true;
    return false;
  }

  onDrop(ev) {
    let dragingTask = el;
    let dropOnTask = ev.target;

    if (ev.target.tagName === 'LI' && parent.id === dropOnTask.parentNode.parentNode.id) {
      const tasksInPanel = Array.from(dropOnTask.parentNode.children);
      let currentPosition = tasksInPanel.indexOf(dragingTask);
      let draggingTaskPriority = currentPosition + 1;
      let tasksToIncreasePriority = [];
      for (let i = 0; i < tasksInPanel.length; i++) {
        if (i > currentPosition) {
          tasksToIncreasePriority.push(tasksInPanel[i].getAttribute('id'));
        }
      }
      this.changeTasksPriority(
        dragingTask.id,
        draggingTaskPriority,
        tasksToIncreasePriority,
        dropOnTask.parentNode.parentNode
      );
    }
  }

  async changeTasksPriority(taskId, taskPriority, otherTasksIds, panel) {
    let isChangeSaved = false;
    await axios.post('/changeTasksPriority', {
      taskId: taskId,
      taskPriority: taskPriority,
      otherTasksIds: otherTasksIds
    })
      .then(function (response) {
        isChangeSaved = true;
        panel.classList.add("success");
        setTimeout(() => {
          panel.classList.remove("success");
        }, 400);
      }).catch(function (error) {
        panel.classList.add("error");
        setTimeout(() => {
          panel.classList.remove("error");
        }, 400)
      });
    return isChangeSaved;
  }

  render() {
    let task = this.props.task;
    return (
      <li draggable="true"
          id={task.id}
          onDragStart={(e) => this.onDragStart(e)}
          onDragOver={(e) => this.onDragOver(e)}
          onDragEnd={(e) => this.onDragEnd(e)}
          onDrop={(e) => this.onDrop(e)}
          className="task">{task.title}
      </li>
    );
  }
}

export default Task;