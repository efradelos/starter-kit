import React, { Component, PropTypes } from 'react';
import { sortBy } from 'lodash';
import { connect } from 'react-redux';

import Conversation from '../common/Conversation';
import { NewPost } from '../common/Conversation/Post';

import { createPost, fetchPosts } from '../../redux/actions/conversations';

class Home extends Component {
  static propTypes = {
    conversations: PropTypes.array,
    profile: PropTypes.object.isRequired,
    onPostSubmitted: PropTypes.func.isRequired,
  }

  static fetchData(dispatch) {
    return dispatch(fetchPosts());
  }

  render() {
    const conversations = sortBy(this.props.conversations, (c) => c.posts[0].created_at);
    return (
      <div className="conversations container">
        <div className="row">
          <div className="col s12 m8 l6 offset-m2 offset-l3">
            {conversations.map((c) => (
              <Conversation
                key={c.id}
                conversation={c}
                author={this.props.profile}
                onPostSubmitted={this.props.onPostSubmitted}
              />
            ))}
            <div className="card grey lighten-3">
              <NewPost
                author={this.props.profile}
                onPostSubmitted={this.props.onPostSubmitted}
                size="small"
                placeholder="Ask a new question..."
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    profile: state.profile,
    conversations: state.conversations.items,
  }
);
const mapDispatchToProps = (dispatch) => {
  dispatch(fetchPosts());
  return {
    onPostSubmitted: (author, post, conversation) =>
      dispatch(createPost(author, post, conversation)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
