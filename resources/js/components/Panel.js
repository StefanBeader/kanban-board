import React, {Component} from 'react';
import Task from './Task';
import axios from 'axios';

class Panel extends Component {

  onDragOver(ev) {
    ev.preventDefault();
  }

  onDragEnter(ev, el) {
    document.getElementById(el).classList.add("hovered");
  };

  onDragLeave(ev, el) {
    document.getElementById(el).classList.remove("hovered");
  };

  getStatusByPanelId(panelId) {
    let status;
    switch (panelId) {
      case 'backlog':
        status = 0;
        break;
      case 'inProgress':
        status = 1;
        break;
      case 'done':
        status = 2;
        break;
    }
    return status;
  }

  onDrop(ev, changeTaskCountState) {
    ev.preventDefault();
    let panel = ev.target;
    panel.classList.remove("hovered");
    if (panel.tagName === 'SECTION') {
      let limit = this.props.inProgressTaskLimit;
      let ul = panel.children[1];
      if (ul.children.length >= limit) {
        panel.classList.add("error");
        setTimeout(() => {
          panel.classList.remove("error");
        }, 400);
        return false;
      }

      let taskId = ev.dataTransfer.getData("task");
      let status = this.getStatusByPanelId(ev.target.id);
      if (this.changeTaskStatus(taskId, status, ev.target)) {
        ev.target.children[1].appendChild(document.getElementById(taskId));
        changeTaskCountState(taskId, status);
      }
    }
  };

  async changeTaskStatus(taskId, status, panel) {
    let isChangeSaved = false;
    await axios.post('/changeTaskStatus', {
      taskId: taskId,
      status: status
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
    let title = this.props.title;
    const tickets = this.props.tasks.map(ticket => {
      return <Task key={ticket.id} task={ticket}/>
    });
    let limit = this.props.inProgressTaskLimit
      ? this.props.inProgressTaskCount + '/' + this.props.inProgressTaskLimit
      : false;
    return (
      <section
        onDragEnter={(e) => this.onDragEnter(e, this.props.id)}
        onDragLeave={(e) => this.onDragLeave(e, this.props.id)}
        onDrop={(e) => this.onDrop(e, this.props.changeTaskCountState)}
        onDragOver={(e) => this.onDragOver(e)}
        id={this.props.id}
        className="panel">
        <h2>{title} {limit}</h2>
        <ul>{tickets}</ul>
      </section>
    );
  }
}

export default Panel;