import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LogInForm from "./LogInForm";
import Spinner from "../layout/Spinner"
import { authUser } from "../../requests/UserRequests";

const LogInPage = ({ history }) => 
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
      setErrors({
        request: {
          message: ""
        }
      })

      history.push('/');
    }
    catch(err)
    {
      setLoading(false);

      // Fix errors system, only request errors should be catched, form errors should be handled inside try block
      setErrors({
        request: {
          message: "Form is not valid."
        }
      })
      console.log("Error: " + err);
    }
  };


  return loading ? (
    <Spinner />
  ) : (
    <LogInForm onSubmit={onSubmit} onChange={onChange} errors={errors} formData={formData} />
  )
}

export default withRouter(LogInPage);