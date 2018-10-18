import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import axios from 'axios';
import Panel from './Panel';
import TaskLimitChanger from './TasksLimitChanger';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      inProgressTaskCount: '',
      inProgressTaskLimit: 3,
    };
    this.changeTaskCountState = this.changeTaskCountState.bind(this);
    this.changeLimitState = this.changeLimitState.bind(this);
  }

  getInProgressTaskCount() {
    return document.getElementById('inProgress').children[1].children.length;
  }

  changeTaskCountState() {
    let inProgressTaskCount = this.getInProgressTaskCount();
    this.setState({
      inProgressTaskCount: inProgressTaskCount
    })
  }

  changeLimitState(limit) {
    this.setState({
      inProgressTaskLimit: limit
    })
  }

  componentDidMount() {
    let self = this;
    axios.get('/getTasks')
      .then(function (response) {
        const allTasks = response.data;
        const inProgressTasks = allTasks.filter(task => {
          if (task.status === 1) {
            return task;
          }
        });
        self.setState({tasks: allTasks, inProgressTaskCount: inProgressTasks.length});
      });
  }

  render() {
    let tasks = this.state.tasks;
    const backlogTasks = [];
    const inProgressTasks = [];
    const doneTasks = [];

    tasks.forEach(task => {
      switch (task.status) {
        case 0:
          backlogTasks.push(task);
          break;
        case 1:
          inProgressTasks.push(task);
          break;
        case 2:
          doneTasks.push(task);
          break;
        default:
      }
    });

    return (
      <div className="App">
        <Panel changeTaskCountState={this.changeTaskCountState} id="backlog" tasks={backlogTasks} title="Backlog"/>
        <Panel changeTaskCountState={this.changeTaskCountState} id="inProgress"
               inProgressTaskCount={this.state.inProgressTaskCount}
               inProgressTaskLimit={this.state.inProgressTaskLimit} tasks={inProgressTasks} title="In Progress"/>
        <Panel changeTaskCountState={this.changeTaskCountState} id="done" tasks={doneTasks} title="Done"/>
        <TaskLimitChanger changeLimitState={this.changeLimitState} max={this.state.tasks.length}
                          value={this.state.inProgressTaskLimit}
                          min={this.state.inProgressTaskCount}/>
      </div>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<App/>, document.getElementById('app'));
}