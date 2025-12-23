import { useState } from "react";
import PostComposer from "./PostComposer";
import PostCard from "./PostCard";

const initialPosts = [
  {
    id: 1,
    author: 'Alice Johnson',
    avatar: '👩‍💻',
    time: '2 hours ago',
    content: 'Just shipped a new feature! The team worked really hard on this one. 🚀',
    likes: 12,
    comments: 3,
    liked: false,
  },
  {
    id: 2,
    author: 'Bob Smith',
    avatar: '👨‍🎨',
    time: '4 hours ago',
    content: 'Beautiful sunset today. Sometimes you need to step away from the screen and appreciate the world around you.',
    likes: 8,
    comments: 1,
    liked: true,
  },
  {
    id: 3,
    author: 'Carol Davis',
    avatar: '👩‍🔬',
    time: '6 hours ago',
    content: 'Excited to share my latest research findings. The data is really promising!',
    likes: 15,
    comments: 5,
    liked: false,
  },
];

export default function SocialFeed() {
  const [posts, setPosts] = useState(initialPosts);

  const toggleLike = (id) => {
    setPosts(posts.map((post) =>
      post.id === id
        ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
        : post
    ));
  };

  const addPost = (content) => {
    setPosts([
      {
        id: Date.now(),
        author: 'You',
        avatar: '🙂',
        time: 'Just now',
        content: content,
        likes: 0,
        comments: 0,
        liked: false,
      },
      ...posts,
    ]);
  };

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <PostComposer onAddPost={addPost} />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={toggleLike}
        />
      ))}
    </div>
  );
}