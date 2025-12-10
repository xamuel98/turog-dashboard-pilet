import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../hooks/useStore";
import ErrorBoundary from "../errors/ErrorBoundary";
import { Button } from "../components/ui";
import { ChevronLeft } from "../components/Icons";
import { dateFilter } from "../utils/filters";
import { Post } from "../types";
import placeholderImg from "../assets/placeholder.jpg";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostById, fetchPosts, posts } = useStore();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPost = async () => {
      // If store is empty, we might need to fetch (e.g. deep link)
      if (posts.length === 0) {
        await fetchPosts();
      }

      const foundPost = getPostById(Number(id));
      setPost(foundPost);
      setLoading(false);
    };

    loadPost();
  }, [id, posts.length, fetchPosts, getPostById]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="h-40 bg-gray-200 rounded mb-4"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Post not found
        </h2>
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="c-section">
        {/* Header */}
        <header className="c-section__header">
          <Button asChild variant="ghost" className="c-back-button">
            <Link to="/dashboard">
              <ChevronLeft />
              Back
            </Link>
          </Button>
        </header>

        {/* Article */}
        <article className="c-article">
          <div className="c-article__container">
            <div className="c-article__header">
              <h1 className="c-article__title">{post.title}</h1>

              <div className="c-article__meta">
                <div className="c-article__meta-user">
                  <div
                    className="c-article__user-avatar"
                    style={{ backgroundImage: `url(${placeholderImg})` }}
                  ></div>
                  <div className="c-article__user-info">
                    <div className="c-article__user-name">
                      User {post.userId}
                    </div>
                    <div className="c-article__date">
                      {dateFilter(new Date().toLocaleDateString())}
                    </div>
                  </div>
                </div>
                <Button variant="outline">Share</Button>
              </div>
            </div>

            <div className="c-article__available-content">
              {post.body.split("\n").map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </ErrorBoundary>
  );
};

export default PostDetail;
