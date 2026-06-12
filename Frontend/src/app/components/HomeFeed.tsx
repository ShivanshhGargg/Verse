import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Bell, Search, Flame } from "lucide-react";
import { feedPosts, Post } from "../data/mockData";

interface Props {
  onAvatarClick?: () => void;
}

export function HomeFeed({ onAvatarClick }: Props) {
  const [posts, setPosts] = useState<Post[]>(feedPosts);

  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-[#08080f]">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 pt-12 pb-4 sticky top-0 z-20"
        style={{
          background: "linear-gradient(180deg, #08080f 70%, transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          className="text-2xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            background: "linear-gradient(135deg, #ffffff, #c084fc)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          verse
        </h1>
        <div className="flex items-center gap-3">
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Search size={16} color="#f0f0fc" />
          </button>
          <button
            className="w-9 h-9 rounded-xl flex items-center justify-center relative"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <Bell size={16} color="#f0f0fc" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}
            />
          </button>
        </div>
      </div>

      {/* Stories row */}
      <div className="px-4 mb-4">
        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {/* Add story */}
          <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.15)", border: "1px dashed rgba(168,85,247,0.4)" }}
            >
              <span className="text-purple-400 text-xl">+</span>
            </div>
            <span className="text-xs" style={{ color: "#7070a0", fontFamily: "var(--font-body)" }}>
              Your story
            </span>
          </div>
          {feedPosts.map((post) => (
            <div key={post.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className="w-14 h-14 rounded-2xl p-0.5"
                style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}
              >
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="w-full h-full rounded-[14px] object-cover"
                />
              </div>
              <span className="text-xs" style={{ color: "#9090b8", fontFamily: "var(--font-body)" }}>
                {post.username.split(".")[0]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-24 space-y-5" style={{ scrollbarWidth: "none" }}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onLike={() => toggleLike(post.id)} />
        ))}

        {/* Trending chip */}
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-2xl mb-2"
          style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.15)" }}
        >
          <Flame size={16} color="#a855f7" />
          <span className="text-sm" style={{ color: "#c084fc", fontFamily: "var(--font-body)" }}>
            You're all caught up! Discover new connections →
          </span>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, onLike }: { post: Post; onLike: () => void }) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0f0f1c", border: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Post header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl p-0.5 flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #a855f7, #3b82f6)" }}
          >
            <img
              src={post.avatar}
              alt={post.username}
              className="w-full h-full rounded-[10px] object-cover"
            />
          </div>
          <div>
            <p
              className="text-sm leading-none mb-0.5"
              style={{ color: "#f0f0fc", fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              {post.username}
            </p>
            <p className="text-xs" style={{ color: "#606080", fontFamily: "var(--font-body)" }}>
              {post.timeAgo} ago
            </p>
          </div>
        </div>
        <button className="opacity-40 hover:opacity-70 transition-opacity">
          <MoreHorizontal size={18} color="#f0f0fc" />
        </button>
      </div>

      {/* Post image */}
      <div className="relative" style={{ background: "#141422" }}>
        <img
          src={post.image}
          alt="post"
          className="w-full object-cover"
          style={{ maxHeight: "380px" }}
        />
        {/* Gradient overlay bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(transparent, rgba(15,15,28,0.6))" }}
        />
      </div>

      {/* Actions */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-1.5 transition-all active:scale-90"
              onClick={onLike}
            >
              <Heart
                size={20}
                color={post.liked ? "#ec4899" : "#f0f0fc"}
                fill={post.liked ? "#ec4899" : "none"}
                strokeWidth={1.5}
              />
              <span
                className="text-sm"
                style={{
                  color: post.liked ? "#ec4899" : "#9090b8",
                  fontFamily: "var(--font-body)",
                }}
              >
                {post.likes.toLocaleString()}
              </span>
            </button>
            <button className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
              <MessageCircle size={20} color="#f0f0fc" strokeWidth={1.5} />
              <span className="text-sm" style={{ color: "#9090b8", fontFamily: "var(--font-body)" }}>
                {post.comments}
              </span>
            </button>
            <button className="opacity-70 hover:opacity-100 transition-opacity">
              <Share2 size={20} color="#f0f0fc" strokeWidth={1.5} />
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className="transition-all active:scale-90"
          >
            <Bookmark
              size={20}
              color={saved ? "#a855f7" : "#f0f0fc"}
              fill={saved ? "#a855f7" : "none"}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Caption */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#c0c0d8", fontFamily: "var(--font-body)" }}
        >
          <span
            className="font-semibold mr-1.5"
            style={{ color: "#f0f0fc", fontFamily: "var(--font-display)" }}
          >
            {post.username}
          </span>
          {post.caption}
        </p>
      </div>
    </div>
  );
}
