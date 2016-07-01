import thinky from '../config/thinky';
import User from './User';

const { r, type } = thinky;

const Post = thinky.createModel('posts', {
  id: type.string().uuid(4),
  conversation_id: type.string().uuid(4).default(r.uuid()),
  author_id: type.string().uuid(4).required(),
  content: type.string().required(),
  read_by: [type.string().uuid(4)],
  created_at: type.date().default(r.now()),
});

Post.belongsTo(User, 'author', 'author_id', 'id');

export default Post;
