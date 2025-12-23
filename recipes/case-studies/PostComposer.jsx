import { useState } from "react";

export default function PostComposer({ onAddPost }) {
  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (!newPost.trim()) return;
    onAddPost(newPost);
    setNewPost('');
  };

  return (
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
          onClick={handleAddPost}
          disabled={!newPost.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Post
        </button>
      </div>
    </div>
  );
}