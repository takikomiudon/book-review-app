import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";

type User = {
  name: string;
  iconUrl: string;
};

type FormData = {
  name: string;
};

const Profile = () => {
  const { token } = useAuth()!;
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const fetchUser = async () => {
    try {
      const response = await fetch(
        "https://railway.bookreview.techtrain.dev/users",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser: SubmitHandler<FormData> = async (formData: FormData) => {
    try {
      const response = await fetch(
        "https://railway.bookreview.techtrain.dev/users",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setMessage("ユーザー情報を更新しました");
    } catch (error) {
      console.error(error);
      setMessage("ユーザー情報の更新に失敗しました");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(updateUser)}>
        <label>name</label>
        <br />
        <input
          type="text"
          defaultValue={user?.name}
          {...register("name", { required: true })}
        />
        {errors.name && <span>Name is required.</span>}
        <br />
        <input type="submit" value="Update" />
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Profile;
