import React from "react";
import { PostType } from "../../entities/post.entity";

interface PostCardProps {
  post: PostType;
}

const formatDate = (date: Date): string => {
  const now = new Date();
  const daysDiff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (daysDiff < 7) {
    if (daysDiff === 0) return "сегодня";
    return `${daysDiff} ${getDayWord(daysDiff)} назад`;
  }

  return date.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const getDayWord = (days: number): string => {
  if (days === 1) return "день";
  if (days >= 2 && days <= 4) return "дня";
  return "дней";
};

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="post-card">
      <h3>{post.caption}</h3>
      <div className="stats">
        <span className="likes">{post.likes}</span>
        <span className="comments">{post.comments}</span>
      </div>
      <div className="info">
        <span className="date">{formatDate(new Date(post.date))}</span>
        <span className="username">{post.username}</span>
      </div>
      <a
        href={post.permalink}
        target="_blank"
        rel="noopener noreferrer"
        className="url"
      >
        {post.permalink}
      </a>
    </div>
  );
};

export default PostCard;
