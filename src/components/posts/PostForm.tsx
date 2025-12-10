import React from "react";
import { useFormik } from "formik";
import { useStore } from "../../hooks/useStore";
import postFormSchema from "../../schemas/post-form-schema";
import { Button, InputField } from "../ui";
import { NewPost } from "../../types";

interface PostFormProps {
  onSuccess?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSuccess }) => {
  const addPost = useStore((state) => state.addPost);

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
  } = useFormik<NewPost>({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: postFormSchema,
    onSubmit: (values, { resetForm }) => {
      addPost(values);
      resetForm();
      if (onSuccess) onSuccess();
    },
  });

  return (
    <form onSubmit={handleSubmit} className="c-post__form">
      <InputField
        label="Title"
        name="title"
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter post title"
        error={touched.title ? errors.title : undefined}
        variant="filled"
      />

      <InputField
        as="textarea"
        label="Body"
        name="body"
        value={values.body}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter post content"
        error={touched.body ? errors.body : undefined}
        variant="filled"
      />

      <div className="c-modal__footer">
        <Button type="submit" variant="primary" disabled={!isValid}>
          Add Post
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
