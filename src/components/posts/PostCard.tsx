import React from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, ChevronRight } from "../Icons";
import { Post } from "../../types";
import { dateFilter } from "../../utils/filters";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="c-post">
      <Link to={`/dashboard/${post.id}`} className="c-post__container">
        <div className="c-post__header">
          <span>{dateFilter(new Date().toLocaleDateString())}</span>
        </div>
        <div className="c-post__content">
          <h3 className="c-post__title" title={post.title}>
            {post.title}
          </h3>
          <p className="c-post__body">{post.body}</p>
          <div className="c-post__meta">
            <div className="c-post__meta-user">
              User {post.userId}
              <BadgeCheck />
            </div>
          </div>
        </div>
        <div className="c-post__footer">
          <div className="c-post__footer-link">
            Read more <ChevronRight />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
