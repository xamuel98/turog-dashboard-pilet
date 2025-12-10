import React from "react";
import { PostCard, EmptyState } from "./";
import { EmptyPostIcon } from "../Icons";
import { Skeleton } from "../ui";
import { Post } from "../../types";

interface PostListProps {
  posts: Post[];
  isLoading: boolean;
  searchQuery?: string;
  hasResults?: boolean;
}

const PostList: React.FC<PostListProps> = ({
  posts,
  isLoading,
  searchQuery = "",
  hasResults = true,
}) => {
  if (isLoading) {
    return (
      <div className="c-post-list" data-skeleton="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height={32} borderRadius={1} />
        ))}
      </div>
    );
  }

  if (!hasResults && searchQuery) {
    return (
      <EmptyState
        title="No posts found"
        subtitle={`We couldn't find any posts matching "${searchQuery}". Try a different search term.`}
        icon={EmptyPostIcon}
      />
    );
  }

  if (posts.length === 0) {
    return (
      <EmptyState
        title="Nothing to read here… for now"
        subtitle="Refresh later to discover trending posts and growing publications."
        icon={EmptyPostIcon}
      />
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
