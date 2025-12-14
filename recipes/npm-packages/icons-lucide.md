# Lucide React Icons

Reactive MD bundles `lucide-react` — a beautiful icon library.

## Basic Icons

```jsx live
import { Heart, Star, Bell, Settings, User, Mail } from 'lucide-react';

function IconShowcase() {
  return (
    <div className="flex gap-4 p-6 bg-gray-100 rounded-lg">
      <Heart className="w-6 h-6 text-red-500" />
      <Star className="w-6 h-6 text-yellow-500" />
      <Bell className="w-6 h-6 text-blue-500" />
      <Settings className="w-6 h-6 text-gray-500" />
      <User className="w-6 h-6 text-green-500" />
      <Mail className="w-6 h-6 text-purple-500" />
    </div>
  );
}
```

## Icon Buttons

```jsx live
import { ThumbsUp, MessageCircle, Share2, Bookmark } from 'lucide-react';

function SocialActions() {
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  
  return (
    <div className="flex gap-2 p-4 bg-white rounded-lg shadow">
      <button 
        onClick={() => setLiked(!liked)}
        className={`p-2 rounded-full transition ${liked ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
      >
        <ThumbsUp className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <MessageCircle className="w-5 h-5" />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <Share2 className="w-5 h-5" />
      </button>
      <button 
        onClick={() => setSaved(!saved)}
        className={`p-2 rounded-full transition ${saved ? 'bg-yellow-100 text-yellow-600' : 'hover:bg-gray-100'}`}
      >
        <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
}
```

## Icon with Text

```jsx live
import { Check, X, AlertTriangle, Info } from 'lucide-react';

function StatusMessages() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded">
        <Check className="w-5 h-5" />
        <span>Success! Your changes have been saved.</span>
      </div>
      <div className="flex items-center gap-2 p-3 bg-red-100 text-red-800 rounded">
        <X className="w-5 h-5" />
        <span>Error! Something went wrong.</span>
      </div>
      <div className="flex items-center gap-2 p-3 bg-yellow-100 text-yellow-800 rounded">
        <AlertTriangle className="w-5 h-5" />
        <span>Warning! Please review your input.</span>
      </div>
      <div className="flex items-center gap-2 p-3 bg-blue-100 text-blue-800 rounded">
        <Info className="w-5 h-5" />
        <span>Info: This is a helpful tip.</span>
      </div>
    </div>
  );
}
```

## Key Points

- `lucide-react` is bundled — works offline
- Over 1000+ icons available
- Use `className` to style (size, color)
- Use `fill="currentColor"` for filled variants
