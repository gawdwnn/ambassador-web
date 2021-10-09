import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./Login.css";

interface Props {}

const Login: React.FC<Props> = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async () => {
    const values = getValues();
    await axios.post("login", { ...values });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            {...register("email", { required: true })}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign in
        </button>
      </form>
    </main>
  );
};

export default Login;
