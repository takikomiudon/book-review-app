import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

const NewBook = () => {
  const [message, setMessage] = useState("");
  const { token } = useAuth()!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    try {
      await fetch("https://railway.bookreview.techtrain.dev/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      setMessage("本の登録が完了しました");
    } catch (error) {
      console.error(error);
      setMessage("本の登録に失敗しました");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
        />
        {errors.title && <p>Title is required.</p>}
        <br />
        <label>URL</label>
        <input
          type="text"
          placeholder="url"
          {...register("url", { required: true })}
        />
        {errors.url && <p>URL is required.</p>}
        <br />
        <label>Detail</label>
        <input
          type="text"
          placeholder="detail"
          {...register("detail", { required: true })}
        />
        {errors.detail && <p>Detail is required.</p>}
        <br />
        <label>Review</label>
        <input
          type="text"
          placeholder="review"
          {...register("review", { required: true })}
        />
        {errors.review && <p>Review is required.</p>}
        <br />
        <input type="submit" value="Add" />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default NewBook;
