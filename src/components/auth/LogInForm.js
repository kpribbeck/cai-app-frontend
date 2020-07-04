import React from "react";
import GoogleLogin from "react-google-login";
import "./Auth.css";

const LogInForm = ({
  onSubmit,
  onChange,
  errors,
  formData,
  onGoogleSubmit,
}) => {
  const displayErrors = Object.keys(errors).map((error) => (
    <p className="error-message" key={error}>
      {errors[error].message}
    </p>
  ));

  const responseGoogle = (response) => {
    const out = { mail: response.profileObj.email, google: true };
    onGoogleSubmit(out);
  };

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
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="password">Contraseña:</label>
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
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Ingresar" />
            <div className="google">
              <GoogleLogin
                clientId="858028191486-hq1albfmdj563rvhnifk5mh71ej818p9.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
                buttonText="Iniciar Sesión"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInForm;
