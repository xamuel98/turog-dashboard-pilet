import React, { useState } from "react";
import InputField from "../ui/InputField";
import { useStore } from "../../hooks/useStore";
import { Button } from "../ui";

interface PostFormProps {
  onSuccess?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSuccess }) => {
  const addPost = useStore((state) => state.addPost);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { title?: string; body?: string } = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!body.trim()) newErrors.body = "Body is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addPost({ title, body });
    setTitle("");
    setBody("");
    setErrors({});
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="c-post__form">
      <InputField
        label="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter post title"
        error={errors.title}
      />

      <InputField
        as="textarea"
        label="Body"
        name="body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter post content"
        error={errors.body}
      />

      <div className="c-modal__footer">
        <Button type="submit" className="c-button c-button--primary">
          Add Post
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
