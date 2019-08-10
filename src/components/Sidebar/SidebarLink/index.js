import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

class SidebarLink extends Component {
  handleClick = () => {
    this.props.history.push(this.props.path);
  }
  render() {
    return (
      <div className='side-bar-item' onClick={this.handleClick}>
        <Link to={this.props.path} className='item-title'>{this.props.title}</Link>
      </div>
    )
  }
} 

export default withRouter(SidebarLink);