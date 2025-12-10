import React, { useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";
import ErrorBoundary from "../errors/ErrorBoundary";
import { PostList, PostForm } from "../components/posts";
import { Pagination, Modal, Button } from "../components/ui";

const DashboardPage: React.FC = () => {
  const {
    posts,
    isLoading,
    error,
    fetchPosts,
    currentPage,
    itemsPerPage,
    setPage,
    getPaginatedPosts,
  } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const paginatedPosts = getPaginatedPosts();
  const totalPages = Math.ceil(posts.length / itemsPerPage);

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
          <Button
            onClick={() => setIsModalOpen(true)}
            className="c-button c-button--primary"
          >
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
          <h2 className="c-posts__container__header">
            Recent Posts ({posts.length})
          </h2>
          <PostList posts={paginatedPosts} isLoading={isLoading} />
        </div>

        {/* Pagination */}
        {!isLoading && posts.length > 0 && (
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
