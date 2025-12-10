import React from "react";
import { Post } from "../../types";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, isLoading }) => {
  if (isLoading) {
    return (
      <div className="c-post-list">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-lg h-48 animate-pulse" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No posts found.</div>
    );
  }

  return (
    <div className="c-post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
