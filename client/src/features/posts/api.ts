import axios from "axios";
import { PostType } from "../../entities/post.entity";

const API_URL = "http://localhost:4000";

export const getPosts = async (): Promise<PostType[]> => {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      axios.get(`${API_URL}/users`),
      axios.get(`${API_URL}/posts`),
    ]);

    const usersMap = usersResponse.data.reduce((acc, user) => {
      acc[user.postId] = user.username;
      return acc;
    }, {});

    return postsResponse.data.map((post) => ({
      ...post,
      username: usersMap[post.id],
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
