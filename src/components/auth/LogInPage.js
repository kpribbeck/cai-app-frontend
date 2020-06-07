import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LogInForm from "./LogInForm";
import Spinner from "../layout/Spinner"
import { authUser } from "../../requests/UserRequests";

const LogInPage = ({ createNotification, history }) => 
{
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    mail: "",
    password: ""
  });

  const onChange = e => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value
    };

    setFormData(newState);
  };

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);

    try
    {
      // AUTH
      setLoading(true);
      const res = await authUser(formData);
      setLoading(false);

      if (res.status != "200")
      {
        // invalid form
        setErrors({
          request: {
            message: res.message
          }
        })
        return;
      }
      
      createNotification("¡Felicitaciones!", "Has ingresado correctamente al sistema.");
      history.push('/');
    }
    catch(err)
    {
      setLoading(false);

      setErrors({
        request: {
          message: "Error de servidor. Intente más tarde."
        }
      })
      console.error(err);
    }
  };


  return loading ? (
    <Spinner />
  ) : (
    <LogInForm onSubmit={onSubmit} onChange={onChange} errors={errors} formData={formData} />
  )
}

export default withRouter(LogInPage);