import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LogInForm from "./LogInForm";
import Spinner from "../layout/Spinner";
import { authUser } from "../../requests/UserRequests";

const LogInPage = ({ createNotification, history }) => {
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
  });

  const onChange = (e) => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(newState);
  };

  const onGoogleSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await authUser(data);
      setLoading(false);
      if (res.status != "200") {
        // invalid form
        setErrors({
          request: {
            message: res.message,
          },
        });
        return;
      }

      createNotification(
        "¡Felicitaciones!",
        "Has ingresado correctamente al sistema."
      );
      history.push("/");
    } catch (err) {
      setLoading(false);

      setErrors({
        request: {
          message: "Error de servidor. Intente más tarde.",
        },
      });
      console.error(err);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // AUTH
      setLoading(true);
      const res = await authUser(formData);
      setLoading(false);

      if (res.status != "200") {
        // invalid form
        setErrors({
          request: {
            message: res.message,
          },
        });
        return;
      }

      createNotification(
        "¡Felicitaciones!",
        "Has ingresado correctamente al sistema."
      );
      history.push("/");
    } catch (err) {
      setLoading(false);

      setErrors({
        request: {
          message: "Error de servidor. Intente más tarde.",
        },
      });
      console.error(err);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <LogInForm
        onSubmit={onSubmit}
        onChange={onChange}
        errors={errors}
        formData={formData}
        onGoogleSubmit={onGoogleSubmit}
      />
    </div>
  );
};

export default withRouter(LogInPage);
