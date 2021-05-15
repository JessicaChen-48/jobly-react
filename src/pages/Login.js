import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoggedOut.css"

function Login({ loginUser }) {
  const history = useHistory();
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    await loginUser(formData);
    setFormData({ username: "", password: "" });
    history.push("/");
  }

  return (
    <div>
    <h1>Login</h1>
    <div className="logged-out-form">
    <form className="col-sm-9" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="username"
          aria-describedby="emailHelp"
          name="username"
          value={formData.username}
          placeholder="Enter username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Password"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
    </div>
    </div>
  );
}

export default Login;
