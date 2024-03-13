import React, { MouseEvent, useState } from "react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setMessage(emailValidation(email));
  };

  const emailValidation = (email: string) => {
    if (!email) return "メールアドレスを入力してください";
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!regex.test(email))
      return "正しい形式でメールアドレスを入力してください";
    return "";
  };

  return (
    <div>
      <h1>Form</h1>
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>{message}</p>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
