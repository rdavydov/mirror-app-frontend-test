import React, { useEffect, useRef, useState } from "react";
import { PostType } from "../../entities/post.entity";
import PostCard from "../components/PostCard";

interface MasonryLayoutProps {
  posts: PostType[];
  columns: number;
  template: string;
}

const MasonryLayout: React.FC<MasonryLayoutProps> = ({
  posts,
  columns,
  template,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      if (container) {
        const containerWidth = container.offsetWidth;
        const columnWidth = containerWidth / columns;
        const newColumnHeights = Array(columns).fill(0);

        Array.from(container.children).forEach((child, index) => {
          const element = child as HTMLElement;
          const column = index % columns;
          element.style.width = `${columnWidth}px`;
          element.style.position = "absolute";
          element.style.left = `${column * columnWidth}px`;
          element.style.top = `${newColumnHeights[column]}px`;
          newColumnHeights[column] += element.offsetHeight;
        });

        container.style.height = `${Math.max(...newColumnHeights)}px`;
        forceUpdate({});
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.unobserve(container);
    };
  }, [columns, posts]);

  return (
    <div
      ref={containerRef}
      className={`masonry-layout ${template}`}
      style={{ position: "relative" }}
    >
      {posts.map((post) => (
        <div key={post.id} className="masonry-item">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
};

export default MasonryLayout;
