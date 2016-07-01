import React, { Component, PropTypes } from 'react';

const avatarColors = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
  'cyan', 'teal', 'green', 'light-green', 'lime-green', 'yellow', 'amber',
  'orange', 'deep-orange',
];

class Avatar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }

  render() {
    const firstChar = this.props.user.first_name[0];
    const color = avatarColors[firstChar.charCodeAt(0) % avatarColors.length];

    return (
      <i className={`material-icons square avatar ${color}`}>{firstChar}</i>
    );
  }
}

export default Avatar;
