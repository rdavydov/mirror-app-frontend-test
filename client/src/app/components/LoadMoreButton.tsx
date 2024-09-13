import React from "react";

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick }) => {
  return (
    <button className="load-more-button" onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
