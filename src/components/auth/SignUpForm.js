import React, { useState } from "react";
import "./Auth.css";
import UploadButton from "../layout/UploadButton";
import GoogleLogin from "react-google-login";

const SignUpForm = ({
  onSubmit,
  onChange,
  onUpload,
  errors,
  formData,
  edit,
  google,
  onGoogleSubmit,
}) => {
  const [showpass, setShowpass] = useState(edit ? false : true);
  const displayErrors = Object.keys(errors).map((error) => (
    <p className="error-message" key={error}>
      {errors[error].message}
    </p>
  ));

  const responseGoogle = (response) => {
    const out = {
      mail: response.profileObj.email,
      name: response.profileObj.givenName,
      last_name: response.profileObj.familyName,
    };
    onGoogleSubmit(out);
  };

  return (
    <div>
      <h1 className="titles">
        {edit ? "Editar" : "Crear"} Cuenta {google && "con Google"}
      </h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="mail">Mail*:</label>
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

          {showpass && !google && (
            <div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="password">Contraseña*:</label>
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
                <div className="col-25">
                  <label htmlFor="verifyPassword">Verifique Contraseña*:</label>
                </div>
                <div className="col-75">
                  <input
                    type="password"
                    id="verifyPassword"
                    name="verifyPassword"
                    value={formData.verifyPassword}
                    minLength="6"
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-25">
              <label htmlFor="name">Nombre*:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label htmlFor="last_name">Apellidos*:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="picture">Foto de perfil:</label>
            </div>
            <div className="col-75">
              {formData.picture !== "" && (
                <div>URL actual: {formData.picture}</div>
              )}
              <UploadButton onChange={onUpload} />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="student_number">Número de Alumno*:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="student_number"
                name="student_number"
                minLength="8"
                maxLength="8"
                value={formData.student_number}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="contact_number">Número de Contacto*:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="contact_number"
                name="contact_number"
                value={formData.contact_number}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="job">Cargo:</label>
            </div>
            <div className="col-75">
              <input
                type="text"
                id="job"
                name="job"
                value={formData.job}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <p className="form-info">Campos con (*) son obligatorios.</p>
            <input
              type="submit"
              value={edit ? "Guardar" : "Enviar Solicitud"}
            />
            <div className="google">
              <GoogleLogin
                clientId="858028191486-hq1albfmdj563rvhnifk5mh71ej818p9.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                cookiePolicy={"single_host_origin"}
                buttonText="Iniciar Sesión"
              />
            </div>
            {edit && (
              <button
                className="changepass"
                onClick={() => setShowpass(showpass ? false : true)}
                type="button"
              >
                Cambiar Contraseña
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
