import thinky from '../config/thinky';
import Post from './Post';

const { r, type } = thinky;

const Conversation = thinky.createModel('conversations', {
  id: type.string().uuid(4),
  participants: [type.string().uuid(4)],
  created_at: type.date().default(r.now()),
});

Conversation.defineStatic('forUser', async function forUser(user) {
  return Conversation
    .filter((c) => c('participants').contains(user.id))
    .map((c) => (
      c.merge({
        posts: c('posts')
          .orderBy('created_at')
          .map((p) => (
            p.merge({
              author: r.table('users').get(p('author_id')),
              unread: p('read_by').contains(user.id).not(),
            })
          ))
          .without('read_by'),
      })
    ))
    .without('participants');
});

export default Conversation;
