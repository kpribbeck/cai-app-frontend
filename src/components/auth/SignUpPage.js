import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import Spinner from "../layout/Spinner"
import { postUser } from "../../requests/UserRequests";

const SignUpPage = ({ history }) => 
{
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    verifyPassword: "",
    name: "",
    last_name: "",
    student_number: "",
    contact_number: "",
    picture: null,
    job: ""
  });

  // This executes when component is mounted
  // If we are not in /sign-up is because we must be editing an existing user,
  // then we need to get the current data for that user
  useEffect(() => {
    if (currentUrl.pathname !== "/sign-up")
    {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (storyId) => 
  {
    // try
    // {
    //   setLoading(true);
    //   const res = await getStory(storyId);
    //   setLoading(false);
    //   setStoryId(res.data.id);
    //   setFormData(
    //     {
    //       title: res.data.title,
    //       body: res.data.body
    //     }
    //   )
    // }
    // catch(err)
    // {
    //   setLoading(false);
    //   console.log("Error: " + err);
    // }
  }

  const checkPasswordError = (pwd1, pwd2) => {
    if (pwd1 !== pwd2)
    {
      const newState = {
        ...formData,
        ["password"]: "",
        ["verifyPassword"]: ""
      };
      setFormData(newState);
      setErrors({
        password: {
          message: "Passwords don´t match."
        }
      })
      return true;
    }
    setErrors({
      password: {
        message: ""
      }
    })
    return false;
  }

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

    let pwdError = checkPasswordError(formData.password, formData.verifyPassword);

    if (pwdError)
    {
      // don't submit
      return;
    }

    try
    {
      if (currentUrl.pathname === "/sign-up")
      {
        // POST
        setLoading(true);
        const res = await postUser(formData);
        setLoading(false);
        setErrors({
          request: {
            message: ""
          }
        })

        history.push('/');

      }
      else
      {
        // PUT
        // setLoading(true);
        // console.log(formData);
        // await putStory(storyId, formData);
        // setLoading(false);
        // history.push('/');

      }
    }
    catch(err)
    {
      setLoading(false);

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
    <SignUpForm onSubmit={onSubmit} onChange={onChange} errors={errors} formData={formData} />
  )
}

export default withRouter(SignUpPage);