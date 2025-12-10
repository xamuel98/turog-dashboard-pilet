import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { useStore } from "../hooks/useStore";
import { Post } from "../types";
import ErrorBoundary from "../errors/ErrorBoundary";

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPostById, fetchPosts, posts } = useStore();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState(true);

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
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Link>

        <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            <div className="flex items-center text-sm text-gray-500 mb-8 space-x-6">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>User {post.userId}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {post.body.split("\n").map((paragraph, idx) => (
                <p key={idx} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      </div>
    </ErrorBoundary>
  );
};

export default PostDetail;
