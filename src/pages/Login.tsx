import React, { MouseEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth()!;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin: SubmitHandler<FormData> = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://railway.bookreview.techtrain.dev/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      login(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <label>メールアドレス</label>
        <br />
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <p>Email is required.</p>}
        <br />
        <label>パスワード</label>
        <br />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {errors.password && <p>Password is required.</p>}
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
