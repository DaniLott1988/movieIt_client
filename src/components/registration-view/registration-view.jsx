import React, { useState } from 'react';
import PropTypes from "prop-types";

export function RegistrationView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birth_date, setBirth_date] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birth_date);
    props.onRegistration(Username);
  }
  return (
    <form>
      <label className="username">
        Username:
        <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label className="password">
        Password:
        <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label className="email">
        Email:
        <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="birth_date">
        Birth_date:
        <input type="date" value={Birth_date} onChange={(e) => setBirth_date(e.target.value)} />
      </label>
      <button type="submit" onClick={this.handleSubmit}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegistration: PropTypes.func.isRequired,
};