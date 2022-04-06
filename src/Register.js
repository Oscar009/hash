import React, { useEffect, useState } from "react";

const Register = (props) => {
  const [error, setError] = useState("");

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    props.handleUpdateFromApp(name, value);
  };

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  return (
    <div class="card text-center">
      <div class="card-header">Register</div>
      <div class="card-body">
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          value={props.user}
          name="user"
          onChange={handleUpdate}
        />
        <br></br>
        <input
          type="password"
          class="form-control"
          placeholder="password"
          value={props.password}
          name="password"
          onChange={handleUpdate}
        />
        <br></br>
        <button
          type="button"
          class="btn btn-outline-primary"
          onClick={props.signUp}
        >
          Sign up
        </button>
      </div>
      <div class="card-footer text-muted">{error}</div>
    </div>
  );
};

export default Register;
