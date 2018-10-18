import React, {Component} from 'react';

class TaskLimitChanger extends Component {

  handleChange(event, changeLimitState) {
    changeLimitState(event.target.value);
  }

  render() {
    return (
      <div className="limiter">
        <label htmlFor="limiter">In Progress task Limit</label>
        <span>{ this.props.min }</span>
        <input type="range"
               id="limiter"
               defaultValue={this.props.value}
               name="limiter"
               step="1"
               max={this.props.max} min={this.props.min}
               onChange={ e => this.handleChange(e, this.props.changeLimitState)}
        />
        <span>{ this.props.max }</span>
      </div>
    )
  }
}

export default TaskLimitChanger;