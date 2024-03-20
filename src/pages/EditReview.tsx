import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type FormData = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

const EditReview = () => {
  const [isMine, setIsMine] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const { token } = useAuth()!;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: { title: "", url: "", detail: "", review: "" },
  });

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await response.json();
      reset(res);
      setIsMine(res.isMine);
    };
    fetchBook();
  }, [reset]);

  const onSubmit = async (formData: FormData) => {
    try {
      await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      setMessage("update success");
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      await fetch(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("delete success");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isMine) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Title</label>
        <input type="text" {...register("title", { required: true })} />
        {errors.title && <p>Title is required.</p>}
        <br />
        <label>URL</label>
        <input type="text" {...register("url", { required: true })} />
        {errors.url && <p>URL is required.</p>}
        <br />
        <label>Detail</label>
        <input type="text" {...register("detail", { required: true })} />
        {errors.detail && <p>Detail is required.</p>}
        <br />
        <label>Review</label>
        <input type="text" {...register("review", { required: true })} />
        {errors.review && <p>Review is required.</p>}
        <br />
        <input type="submit" value="edit" />
      </form>
      <button onClick={onDelete}>delete</button>
      {message && <p>{message}</p>}
    </div>
  ); // UX部分はデザイナーが決めきれていない場合があるのでFEが巻き取る　
};

export default EditReview;
