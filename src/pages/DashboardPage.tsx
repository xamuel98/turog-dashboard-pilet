import React, { useEffect, useState, useMemo } from "react";
import { useStore } from "../hooks/useStore";
import ErrorBoundary from "../errors/ErrorBoundary";
import { PostList, PostForm } from "../components/posts";
import { Pagination, Modal, Button, InputField } from "../components/ui";
import { SearchIcon } from "../components/Icons";

const DashboardPage: React.FC = () => {
  const {
    posts,
    isLoading,
    error,
    fetchPosts,
    currentPage,
    itemsPerPage,
    setPage,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.body.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setPage(1);
  }, [searchQuery, setPage]);

  return (
    <ErrorBoundary>
      <div className="c-section">
        {/* Header */}
        <header className="c-section__header">
          <div className="c-section__header__group">
            <h1 className="c-section__header__title">Dashboard</h1>
            <p className="c-section__header__subtitle">
              Manage and view your posts
            </p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} variant="primary">
            New Post
          </Button>
        </header>

        {/* Add Post Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Post"
        >
          <PostForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>

        {/* Posts List */}
        <div className="c-posts__container">
          <div className="c-posts__container__header-wrapper">
            <h2 className="c-posts__container__header">
              Recent Posts ({filteredPosts.length})
            </h2>
            <InputField
              type="text"
              placeholder="Search posts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="c-search-field"
              variant="default"
              prepend={<SearchIcon />}
              append={
                searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )
              }
            />
          </div>
          <PostList
            posts={paginatedPosts}
            isLoading={isLoading}
            searchQuery={searchQuery}
            hasResults={filteredPosts.length > 0}
          />
        </div>

        {/* Pagination */}
        {!isLoading && filteredPosts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default DashboardPage;
