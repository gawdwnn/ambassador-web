import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./Register.css";

interface Props {}

const Register: React.FC<Props> = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [redirect, setRedirect] = useState(false);

  const onSubmit = async () => {
    const values = getValues();
    await axios.post("register", { ...values });
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/"} />;
  }

  return (
    <main className="form-signin">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <div className="form-floating">
          <input
            className="form-control"
            placeholder="First Name"
            {...register("first_name", { required: true })}
          />
          <label>First Name</label>
        </div>

        <div className="form-floating">
          <input
            className="form-control"
            placeholder="Last Name"
            {...register("last_name", { required: true })}
          />
          <label>Last Name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            {...register("email", { required: true })}
          />
          <label>Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <label>Password</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password Confirm"
            {...register("password_confirm", { required: true })}
          />
          <label>Password Confirm</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Register;
