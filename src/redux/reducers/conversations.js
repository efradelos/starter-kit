import { without, now } from 'lodash';

import { FETCH_POSTS, FETCH_POSTS_SUCCESS, NEW_POST_SUCCESS } from '../actions/conversations';

const postsA = (state = [], action) => {
  switch (action.type) {
    case NEW_POST_SUCCESS:
      return [...state, action.payload];
    default:
      return state;
  }
};

const conversationA = (state, action) => {
  switch (action.type) {
    case NEW_POST_SUCCESS: {
      const conversation = Object.assign(state || { posts: [] },
        { id: action.payload.conversation_id });

      return Object.assign(conversation, { posts: postsA(conversation.posts, action) });
    }
    default:
      return state;
  }
};

const defaultState = { isFetching: false, didInvalidate: true, items: [] };

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return Object.assign({}, state, { isFetching: true });
    case NEW_POST_SUCCESS: {
      const post = action.payload;
      const conversation = state.items.find((c) => c.id === post.conversation_id);
      return Object.assign({}, state, {
        items: [
          ...without(state.items, conversation),
          conversationA(conversation, action),
        ],
      });
    }
    case FETCH_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        lastFetch: now(),
        items: action.payload,
      });
    default:
      return state;
  }
};
