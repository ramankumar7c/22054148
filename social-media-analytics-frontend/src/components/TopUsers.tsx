import React, { useEffect, useState } from "react";
import axios from "../api";

interface User {
  id: number;
  name: string;
  posts: number;
}

const TopUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get<User[]>("/api/top-users").then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Top Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="p-2 border-b">{user.name} - {user.posts} Posts</li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsersPage;