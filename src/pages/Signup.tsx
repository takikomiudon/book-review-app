import React, { ChangeEvent, FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import Compressor from "compressorjs";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const Signup = () => {
  const [file, setFile] = useState<File | null>(null);
  const { token } = useAuth()!;
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files[0] : null;
    setFile(files);
  };

  const onSubmit: SubmitHandler<FormData> = async (formData: FormData) => {
    try {
      await fetch("https://railway.bookreview.techtrain.dev/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setMessage("ユーザー登録が完了しました");
    } catch (error) {
      console.error(error);
      setMessage("ユーザー登録に失敗しました");
    }
  };

  const handleUpload = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;
    new Compressor(file, {
      quality: 0.6,
      success: async (result) => {
        const formData = new FormData();
        formData.append("icon", result);
        const response = await axios.post(
          "https://railway.bookreview.techtrain.dev/uploads",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>name</label>
        <br />
        <input
          type="text"
          placeholder="name"
          {...register("name", { required: true })}
        />
        {errors.name && <p>Name is required.</p>}
        <br />
        <label>email</label>
        <br />
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p>Email is required.</p>}
        <br />
        <label>password</label>
        <br />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p>Password is required.</p>}
        <br />
        <input type="submit" value="Signup" />
        {message}
      </form>
      <form>
        <input type="file" onChange={handleFileChange} />
        <br />
        <button onClick={handleUpload}>Upload</button>
      </form>
      <a href="/login">Loginはこちら</a>
    </div>
  );
};

export default Signup;
