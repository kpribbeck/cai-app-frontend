import React from "react";
import "./Auth.css";

const LogInForm = ({ onSubmit, onChange, errors, formData }) => {
  const displayErrors = Object.keys(errors).map((error) => (
    <p className="error-message" key={error}>
      {errors[error].message}
    </p>
  ));

  return (
    <div>
      <h1 className="titles">Ingresar</h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="mail">Mail:</label>
              <br />
            </div>
            <div className="col-75">
              <input
                type="email"
                id="mail"
                name="mail"
                value={formData.mail}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="password">Contraseña:</label>
              <br />
            </div>
            <div className="col-75">
              <input
                type="password"
                id="password"
                name="password"
                minLength="6"
                value={formData.password}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Ingresar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
