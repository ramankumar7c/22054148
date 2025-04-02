import React from "react";
import Feed from "../components/Feed";

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Social Media Analytics</h1>
      <Feed />
    </div>
  );
};

export default Home;

export {};