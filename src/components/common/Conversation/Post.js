import React, { Component, PropTypes } from 'react';
import { noop } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Post.scss';

import Avatar from '../Avatar';

@withStyles(s)
class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    size: PropTypes.oneOf(['small']),
    unread: PropTypes.bool,
  }

  renderUnreadIndicator() {
    if (this.props.unread) {
      return (
        <div className="unread-indicator">
          <i className="material-icons red-text">info</i>
        </div>
      );
    }

    return false;
  }

  render() {
    let cn = 'post';
    if (this.props.size) cn = `${cn} post-${this.props.size}`;
    return (
      <div className={cn}>
        <Avatar user={this.props.post.author} />
        <p className="post-author">
          {this.props.post.author.first_name} {this.props.post.author.last_name}
        </p>
        <p className="post-content">
          {this.props.post.content}
        </p>
        {this.renderUnreadIndicator()}
      </div>
    );
  }
}

@withStyles(s)
class NewPost extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    conversation: PropTypes.object,
    size: PropTypes.oneOf(['small']),
    placeholder: PropTypes.string.isRequired,
    onPostSubmitted: PropTypes.func.isRequired,
  }

  static defaultProps = {
    placeholder: 'Write a comment...',
    onPostSubmitted: noop,
  }

  constructor() {
    super();
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      this.props.onPostSubmitted(this.props.author, this.refs.post.value, this.props.conversation);
      this.refs.post.value = '';
    }
  }

  render() {
    let cn = 'post';
    if (this.props.size) cn = `${cn} post-${this.props.size}`;
    return (
      <div className={cn}>
        <Avatar user={this.props.author} />
        <span className="input-field">
          <textarea
            id="textarea1"
            ref="post"
            onKeyDown={this.handleEnter}
            className="materialize-textarea grey lighten-5"
            placeholder={this.props.placeholder}
          />
        </span>
      </div>
    );
  }
}

export { NewPost };
export default withStyles(s)(Post);
