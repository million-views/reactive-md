# Social Feed

> Timeline, posts, and reactions.

## About This Case Study

Social feeds are complex systems with real-time updates, engagement features, and content moderation needs. This case study explores the core requirements.

---

## Interactive Prototype

```jsx
import { useState } from 'react';

const initialPosts = [
  {
    id: 1,
    author: 'Alice Johnson',
    avatar: '👩',
    time: '2h ago',
    content: 'Just shipped a new feature! 🚀 Really excited to see how users respond.',
    likes: 42,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    author: 'Bob Smith',
    avatar: '👨',
    time: '4h ago',
    content: 'Great article on product management best practices. Highly recommend reading it.',
    likes: 18,
    comments: 3,
    liked: true,
  },
  {
    id: 3,
    author: 'Carol White',
    avatar: '👩‍🦰',
    time: '1d ago',
    content: 'Team offsite was amazing! Here are some highlights from our planning session.',
    likes: 89,
    comments: 15,
    liked: false,
  },
];

export default function SocialFeed() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  
  const toggleLike = (id) => {
    setPosts(posts.map((post) =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
        : post
    ));
  };
  
  const addPost = () => {
    if (!newPost.trim()) return;
    setPosts([
      {
        id: Date.now(),
        author: 'You',
        avatar: '🙂',
        time: 'Just now',
        content: newPost,
        likes: 0,
        comments: 0,
        liked: false,
      },
      ...posts,
    ]);
    setNewPost('');
  };
  
  return (
    <div className="max-w-lg mx-auto space-y-4">
      {/* Composer */}
      <div className="bg-white rounded-xl p-4 shadow-lg">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full resize-none border-none focus:outline-none"
          rows={3}
        />
        <div className="flex justify-between items-center mt-3 pt-3 border-t">
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded">📷</button>
            <button className="p-2 hover:bg-gray-100 rounded">🔗</button>
            <button className="p-2 hover:bg-gray-100 rounded">😊</button>
          </div>
          <button
            onClick={addPost}
            disabled={!newPost.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
      
      {/* Feed */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl p-4 shadow-lg">
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
              onClick={() => toggleLike(post.id)}
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
      ))}
    </div>
  );
}
```

---

## Requirements Summary

### Feed Features
- Real-time updates
- Infinite scroll
- Rich media support (images, videos, links)
- Post composer with rich text

### Engagement Features
- Like/reaction system
- Comments with threading
- Share/repost functionality
- Bookmarks/saves

### Content Moderation
- Report functionality
- Content filtering
- Block/mute users

---

*Created with [Reactive MD](https://marketplace.visualstudio.com/items?itemName=million-views.reactive-md)*
