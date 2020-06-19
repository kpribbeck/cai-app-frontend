import React, { useState } from "react";
import "./Auth.css";
import UploadButton from "../layout/UploadButton";

const SignUpForm = ({ onSubmit, onChange, onUpload, errors, formData, edit }) => {
  const [showpass, setShowpass] = useState(edit ? false : true);
  const displayErrors = Object.keys(errors).map((error) => (
    <p className="error-message" key={error}>
      {errors[error].message}
    </p>
  ));

  return (
    <div>
      <h1 className="titles">{edit ? "Editar" : "Crear"} Cuenta</h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="mail">Mail*:</label>
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
          {showpass && (
            <div>
              <div className="row">
                <div className="col-25">
                  <label htmlFor="password">Contraseña*:</label>
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
                <div className="col-25">
                  <label htmlFor="verifyPassword">Verifique Contraseña*:</label>
                  <br />
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
                  <br />
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-25">
              <label htmlFor="name">Nombre*:</label>
              <br />
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
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="last_name">Apellidos*:</label>
              <br />
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
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="picture">Foto de perfil:</label>
              <br />
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
              <br />
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
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="contact_number">Número de Contacto*:</label>
              <br />
            </div>
            <div className="col-75">
              <input
                type="text"
                id="contact_number"
                name="contact_number"
                value={formData.contact_number}
                onChange={(e) => onChange(e)}
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="job">Cargo:</label>
              <br />
            </div>
            <div className="col-75">
              <input
                type="text"
                id="job"
                name="job"
                value={formData.job}
                onChange={(e) => onChange(e)}
              />
              <br />
            </div>
          </div>
          <div className="row">
            <p className="form-info">Campos con (*) son obligatorios.</p>
            <input
              type="submit"
              value={edit ? "Guardar" : "Enviar Solicitud"}
            />
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
