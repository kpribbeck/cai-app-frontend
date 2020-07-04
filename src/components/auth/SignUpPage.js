import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import Spinner from "../layout/Spinner";
import { postUser, getUsers, putUser } from "../../requests/UserRequests";

const SignUpPage = ({ createNotification, history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);
  const [google, setGoogle] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState();
  const [uploadedfile, setFile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    verifyPassword: "",
    name: "",
    last_name: "",
    student_number: "",
    contact_number: "",
    picture: "",
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
        picture: filtered.picture,
      });
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  const checkPasswordError = (pwd1, pwd2) => {
    if (pwd1 !== pwd2 && !google) {
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

  const onGoogleSubmit = (response) => {
    setGoogle(true);
    const newState = {
      ...formData,
      mail: response.mail,
      name: response.name,
      last_name: response.last_name,
    };

    setFormData(newState);
  };

  const onUpload = (e) => {
    // hanlde image upload
    const file = e.target.files[0];

    const types = ["image/png", "image/jpeg", "image/gif"];

    if (types.every((type) => file.type !== type)) {
      // error, unsupported type
      setErrors({
        upload: {
          message: `El formato ${file.type} no está soportado por el sistema. Ingrese un archivo jpeg o png.`,
        },
      });
      return;
    }

    if (file.size > 500000) {
      // error, file too large
      setErrors({
        upload: {
          message: `El tamaño de la imagen es demasiado grande.`,
        },
      });
      return;
    }

    // update state
    setFile(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let pwdError = checkPasswordError(
      formData.password,
      formData.verifyPassword
    );

    if (pwdError) {
      // don't submit
      return;
    }

    // pass form data to a FormData html5 object, so that file gets sent correctly
    const form = new FormData();
    form.append("mail", formData.mail);
    if (google) {
      form.append("password", "123456789");
      form.append("verifyPassword", "123456789");
      form.append("google", true);
    } else {
      form.append("password", formData.password);
      form.append("verifyPassword", formData.verifyPassword);
    }
    form.append("name", formData.name);
    form.append("last_name", formData.last_name);
    form.append("student_number", formData.student_number);
    form.append("contact_number", formData.contact_number);
    form.append("job", formData.job);
    form.append("picture", formData.picture);
    form.append("file", uploadedfile);

    try {
      if (currentUrl.pathname === "/sign-up") {
        // POST
        setLoading(true);
        const res = await postUser(form);
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
        const res = await putUser(userId, form);
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
      onUpload={onUpload}
      errors={errors}
      formData={formData}
      edit={edit}
      google={google}
      onGoogleSubmit={onGoogleSubmit}
    />
  );
};

export default withRouter(SignUpPage);
