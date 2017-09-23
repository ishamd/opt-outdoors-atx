import React from 'react';
import Moment from 'react-moment';

class Comments extends React.Component {
  // constructor(props) {
  //   super(props);
  //
  // }

  render() {
    return (
      <div className="py-2">

        <div className="card">
          <div className="card-header">
            Posted by: {this.props.details.first} {this.props.details.last} <i>(<Moment fromNow>{this.props.details.created_at}</Moment>)</i>
          </div>
          <div className="card-block">
            <p className="card-text">{this.props.details.content}</p>
          </div>
        </div>

      </div>
    )
  }
}

export default Comments;
