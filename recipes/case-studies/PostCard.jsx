export default function PostCard({ post, onLike }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl">
          {post.avatar}
        </div>
        <div>
          <div className="font-medium">{post.author}</div>
          <div className="text-sm text-gray-500">{post.time}</div>
        </div>
      </div>

      {/* Content */}
      <p className="mb-4">{post.content}</p>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-500 pb-3 border-b">
        <span>{post.likes} likes</span>
        <span>{post.comments} comments</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-3">
        <button
          onClick={() => onLike(post.id)}
          className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${
            post.liked ? 'text-red-600' : 'hover:bg-gray-100'
          }`}
        >
          {post.liked ? '❤️' : '🤍'} Like
        </button>
        <button className="flex-1 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
          💬 Comment
        </button>
        <button className="flex-1 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2">
          ↗️ Share
        </button>
      </div>
    </div>
  );
}