import React, { useEffect, useState } from "react";
import { PostType } from "../../entities/post.entity";
import GridLayout from "../layout/GridLayout";
import MasonryLayout from "../layout/MasonryLayout";
import Pagination from "../components/Pagination";
import LoadMoreButton from "../components/LoadMoreButton";
import { usePostsService } from "../../features/posts/service";
import { useSettingsStore } from "../../store/settingsStore";

interface PostsPageProps {}

const PostsPage: React.FC<PostsPageProps> = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState<PostType[]>([]);

  const { settings } = useSettingsStore();

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await usePostsService.getPosts();
      setPosts(fetchedPosts);

      const calculatePostsPerPage = () => {
        if (settings.layout.current === "grid") {
          return Math.floor(
            settings.layout.params.grid.rows *
              settings.layout.params.grid.columns
          );
        } else if (settings.layout.current === "masonry") {
          return Math.floor(
            settings.layout.params.masonry.rows *
              settings.layout.params.masonry.columns
          );
        }
        return 1;
      };

      setPostsPerPage(calculatePostsPerPage());
    };

    fetchPosts();
  }, [settings]);

  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [posts, postsPerPage, currentPage]);

  const renderLayout = () => {
    switch (settings.layout.current) {
      case "grid":
        return (
          <GridLayout
            posts={currentPosts}
            columns={settings.layout.params.grid.columns}
            rows={settings.layout.params.grid.rows}
            template={settings.template}
          />
        );
      case "masonry":
        return (
          <MasonryLayout
            posts={currentPosts}
            columns={settings.layout.params.masonry.columns}
            rows={settings.layout.params.masonry.rows}
            template={settings.template}
          />
        );
      default:
        return null;
    }
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="posts-page">
      <h1>Посты</h1>
      {renderLayout()}
      {settings.navigation === "pagination" ? (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      ) : (
        <LoadMoreButton onClick={() => setCurrentPage(currentPage + 1)} />
      )}
    </div>
  );
};

export default PostsPage;
