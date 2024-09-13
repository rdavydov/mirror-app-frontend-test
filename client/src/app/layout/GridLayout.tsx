import React from "react";
import { PostType } from "../../entities/post.entity";
import PostCard from "../components/PostCard";

interface GridLayoutProps {
  posts: PostType[];
  columns: number;
  rows: number;
  template: string;
}

const GridLayout: React.FC<GridLayoutProps> = ({
  posts,
  columns,
  rows,
  template,
}) => {
  return (
    <div
      className={`grid-layout ${template}`}
      style={{ "--columns": columns, "--rows": rows } as React.CSSProperties}
    >
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="grid-item"
          style={{ "--col-span": 1, "--row-span": 1 } as React.CSSProperties}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
