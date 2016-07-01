import callApi from './api';

export const NEW_POST = 'NEW_POST';
export const NEW_POST_SUCCESS = 'NEW_POST_SUCCESS';
export const NEW_POST_FAIL = 'NEW_POST_FAIL';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';


export function fetchPosts() {
  return callApi('/api/posts', FETCH_POSTS, {
    bailout: (state) => state.conversations.isFetching || !state.conversations.didInvalidate,
  });
}

export function createPost(author, content, conversation) {
  return callApi('/api/posts', NEW_POST, {
    method: 'PUT',
    body: JSON.stringify({
      author,
      content,
      conversation_id: conversation ? conversation.id : undefined,
    }),
  });
}
