import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../types";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="c-post">
      <Link to={`/dashboard/${post.id}`} className="c-post__container">
        <div className="c-post__content">
          <h3 className="c-post__title" title={post.title}>
            {post.title}
          </h3>
          <p className="c-post__body">{post.body}</p>
          <div className="c-post__meta">
            <div className="c-post__meta-user">
              User {post.userId}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="16px"
                height="16px"
                viewBox="0 0 20 20"
              >
                <path
                  d="m17.999,10c0-1.097-.567-2.113-1.465-2.707.215-1.054-.103-2.174-.878-2.95-.775-.776-1.896-1.094-2.95-.878-.593-.897-1.609-1.464-2.706-1.464s-2.113.567-2.706,1.464c-1.053-.216-2.174.102-2.95.878s-1.093,1.896-.878,2.949c-.897.593-1.465,1.61-1.465,2.707s.567,2.113,1.465,2.707c-.215,1.054.103,2.174.878,2.95s1.898,1.092,2.95.878c.593.897,1.609,1.464,2.706,1.464s2.113-.568,2.706-1.465c1.059.214,2.176-.103,2.95-.878.776-.776,1.094-1.896.878-2.95.897-.593,1.465-1.609,1.465-2.707Zm-4.218-1.875l-4,5c-.178.222-.442.358-.726.374-.019,0-.037.001-.056.001-.265,0-.52-.105-.707-.293l-2-2c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.21,1.21,3.302-4.127c.347-.43.975-.502,1.406-.156.431.345.501.974.156,1.405Z"
                  stroke-width="0"
                  fill="#000"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="c-post__footer">
          <div className="c-post__footer-link">
            Read more{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="12px"
              height="12px"
              viewBox="0 0 12 12"
            >
              <path
                d="m4.25,11c-.192,0-.384-.073-.53-.22-.293-.293-.293-.768,0-1.061l3.72-3.72-3.72-3.72c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l4.25,4.25c.293.293.293.768,0,1.061l-4.25,4.25c-.146.146-.338.22-.53.22Z"
                stroke-width="0"
                fill="#000"
              ></path>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
