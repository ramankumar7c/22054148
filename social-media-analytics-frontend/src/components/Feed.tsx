import React, { useEffect, useState } from "react";
import axios from "../api";

interface Post {
  id: number;
  title: string;
}

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = () => {
      axios.get<Post[]>("/api/feed").then((response) => {
        setPosts(response.data);
      });
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Live Feed</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="p-2 border-b">{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Feed;

export {};