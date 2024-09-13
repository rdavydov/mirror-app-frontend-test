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
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { settings } = useSettingsStore();

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await usePostsService.getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []); // Получение постов при монтировании компонента

  useEffect(() => {
    const calculatePostsPerPage = () => {
      if (settings.layout.current === "grid") {
        return Math.floor(
          settings.layout.params.grid.rows * settings.layout.params.grid.columns
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
    setCurrentPage(1);
    setDisplayedPosts([]);
  }, [settings]);

  useEffect(() => {
    if (settings.navigation === "pagination") {
      updatePaginatedPosts();
    } else {
      updateLoadMorePosts();
    }
  }, [posts, postsPerPage, currentPage, settings.navigation]);

  const updatePaginatedPosts = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setDisplayedPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
    setHasMore(indexOfLastPost < posts.length);
  };

  const updateLoadMorePosts = () => {
    const newPosts = posts.slice(0, currentPage * postsPerPage);
    setDisplayedPosts(newPosts);
    setHasMore(newPosts.length < posts.length);
  };

  const renderLayout = () => {
    switch (settings.layout.current) {
      case "grid":
        return (
          <GridLayout
            posts={displayedPosts}
            columns={settings.layout.params.grid.columns}
            rows={settings.layout.params.grid.rows}
            template={settings.template}
          />
        );
      case "masonry":
        return (
          <MasonryLayout
            posts={displayedPosts}
            columns={settings.layout.params.masonry.columns}
            rows={settings.layout.params.masonry.rows}
            template={settings.template}
          />
        );
      default:
        return null;
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

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
        hasMore && <LoadMoreButton onClick={loadMore} />
      )}
    </div>
  );
};

export default PostsPage;
