import React, { useEffect, useState } from "react";
import axios from "../api";

interface Post {
  id: number;
  title: string;
  comments: number;
}

const TrendingPostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get<Post[]>("/api/trending-posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Trending Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="p-2 border-b">{post.title} - {post.comments} Comments</li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPostsPage;