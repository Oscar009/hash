import React from "react";

const Login = (props) => {
  const handleUpdate = (e) => {
    const { name, value } = e.target;
    props.handleUpdateFromApp(name, value);
  };

  return (
    <div class="card text-center">
      <div class="card-header">Login</div>
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
        <button type="button" class="btn btn-outline-primary" onClick={props.signIn}>
          Sign in
        </button>
      </div>
      <div class="card-footer text-muted">{props.error}</div>
    </div>
  );
};

export default Login;
