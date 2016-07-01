import React, { Component, PropTypes } from 'react';
import { some, noop } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Post, { NewPost } from './Post';
import s from './Conversation.scss';

@withStyles(s)
class Conversation extends Component {
  static propTypes = {
    conversation: PropTypes.object.isRequired,
    author: PropTypes.object,
    onPostSubmitted: PropTypes.func,
  }

  constructor() {
    super();
    this.toggleViewResponses = this.toggleViewResponses.bind(this);
    this.state = { showResponses: false };
  }

  toggleViewResponses(e) {
    this.setState({ showResponses: !this.state.showResponses });
    e.preventDefault();
  }

  render() {
    const posts = this.props.conversation.posts;
    const unread = some(this.props.conversation.posts, (p) => p.unread);

    if (posts.length === 0) return null;
    return (
      <div className={`card conversation ${this.state.showResponses ? 'expanded' : ''}`}>
        <div className="card-content" onClick={this.toggleViewResponses}>
          <Post post={posts[0]} unread={unread} />
        </div>
        <div className={`card-action grey lighten-3 ${this.state.showResponses ? '' : 'hide'}`}>
          {posts.slice(1).map((p) => <Post key={p.id} post={p} size="small" />)}
          {
            this.props.author ?
              <NewPost
                author={this.props.author}
                conversation={this.props.conversation}
                onPostSubmitted={this.props.onPostSubmitted || noop}
                size="small"
              /> :
                false
          }
        </div>
      </div>
    );
  }
}

export default Conversation;
