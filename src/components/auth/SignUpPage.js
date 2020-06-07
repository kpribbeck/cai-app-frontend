import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import Spinner from "../layout/Spinner";
import { postUser, getUsers, putUser } from "../../requests/UserRequests";

const SignUpPage = ({ createNotification, history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState();
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    verifyPassword: "",
    name: "",
    last_name: "",
    student_number: "",
    contact_number: "",
    picture: null,
    job: "",
  });

  // This executes when component is mounted
  // If we are not in /sign-up is because we must be editing an existing user,
  // then we need to get the current data for that user
  useEffect(() => {
    if (currentUrl.pathname !== "/sign-up") {
      setEdit(true);
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (userId) => {
    try {
      setLoading(true);
      const res = await getUsers();
      const filtered = res.data.filter((user) => user.id == userId)[0];
      setUserId(filtered.id);
      setLoading(false);
      setFormData({
        mail: filtered.mail,
        name: filtered.name,
        last_name: filtered.last_name,
        student_number: filtered.student_number,
        contact_number: filtered.contact_number,
        job: filtered.job,
      });
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  const checkPasswordError = (pwd1, pwd2) => {
    if (pwd1 !== pwd2) {
      const newState = {
        ...formData,
        ["password"]: "",
        ["verifyPassword"]: "",
      };
      setFormData(newState);
      setErrors({
        password: {
          message: "Passwords don´t match.",
        },
      });
      return true;
    }
    setErrors({
      password: {
        message: "",
      },
    });
    return false;
  };

  const onChange = (e) => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(newState);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    let pwdError = checkPasswordError(
      formData.password,
      formData.verifyPassword
    );

    if (pwdError) {
      // don't submit
      return;
    }

    try {
      if (currentUrl.pathname === "/sign-up") {
        // POST
        setLoading(true);
        const res = await postUser(formData);
        setLoading(false);

        if (res.status != "201") {
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
          "Se ha enviado una solicitud de registro correctamente."
        );
        history.push("/");
      } else {
        // PUT
        setLoading(true);
        const res = await putUser(userId, formData);
        setLoading(false);
        
        if (res.status != "201") {
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
          "Se ha modificado su cuenta correctamente."
        );
        history.push("/");
      }
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
    <SignUpForm
      onSubmit={onSubmit}
      onChange={onChange}
      errors={errors}
      formData={formData}
      edit={edit}
    />
  );
};

export default withRouter(SignUpPage);
