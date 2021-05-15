import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LoggedOut.css"

function Signup({ signUp }) {
  const initialFormData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  };
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormData);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    await signUp(formData);
    history.push("/");
  }

  return (
    <div>
    <h1>Signup for Jobly</h1>
    <div className="logged-out-form">
    <form className="col-sm-9" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="username"
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
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          placeholder=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          placeholder=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          placeholder=""
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

export default Signup;
