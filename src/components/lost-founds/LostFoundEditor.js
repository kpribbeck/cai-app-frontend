import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import {
  getLostFound,
  postLostFound,
  putLostFound,
} from "../../requests/LostFoundRequests";
import Spinner from "../layout/Spinner";
import UploadButton from "./UploadButton";

const LostFoundEditor = ({ createNotification, history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [lostFoundId, setLostFoundId] = useState(null);

  const [uploadedfile, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    picture: "",
    pickedUp: 0,
    pickedBy_name: "",
    pickedBy_mail: "",
    pickedBy_phone: "",
  });

  const {
    name,
    description,
    picture,
    pickedUp,
    pickedBy_name,
    pickedBy_mail,
    pickedBy_phone,
    file,
  } = formData;

  // This executes when component is mounted
  // If we are not in /lost-founds/new is because we must be editing a specific lost-found,
  // then we need to get the current data of that lost-found
  useEffect(() => {
    if (currentUrl.pathname !== "/lost-founds/new") {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (lostFoundId) => {
    try {
      setLoading(true);
      const res = await getLostFound(lostFoundId);
      setLoading(false);
      setLostFoundId(res.data.id);
      setFormData({
        name: res.data.name,
        description: res.data.description,
        picture: res.data.picture,
        pickedBy_name: res.data.pickedBy_name,
        pickedBy_mail: res.data.pickedBy_mail,
        pickedBy_phone: res.data.pickedBy_phone,
      });
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  const onChange = (e) => {
    let newState = {}; 
    if (e.target.name !== "pickedUp")
    {
      newState = {
        ...formData,
        [e.target.name]: e.target.value,
      };
    }
    else
    {
      let checked = 0;
      if (e.target.checked) checked = 1;
      newState = {
        ...formData,
        [e.target.name]: checked,
      };
    }

    setFormData(newState);
  };

  const onUpload = (e) => {
    // hanlde image upload
    const file = e.target.files[0];

    console.log(file);
  
    const types = ['image/png', 'image/jpeg', 'image/gif'];

    if (types.every(type => file.type !== type))
    {
      // error, unsupported type
      setErrors({
        upload: {
          message: `El formato ${file.type} no está soportado por el sistema. Ingrese un archivo jpeg o png.`,
        },
      });
      return;
    }

    if (file.size > 500000)
    {
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

  }

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    try {

      if (uploadedfile == null)
      {
        setErrors({
          upload: {
            message: `Debe adjuntar una imagen.`,
          },
        });
        return;
      }

      // pass form data to a FormData html5 object, so that file gets sent correctly
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("picture", formData.picture);
      form.append("pickedBy_name", formData.pickedBy_name);
      form.append("pickedBy_mail", formData.pickedBy_mail);
      form.append("pickedBy_phone", formData.pickedBy_phone);
      form.append("file", uploadedfile);
      console.log(uploadedfile);


      if (currentUrl.pathname === "/lost-founds/new") {
        // POST
        setLoading(true);
        const res = await postLostFound(form);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has creado un nuevo objeto correctamente."
        );
        history.push("/lost-founds");
      } else {
        // PUT
        setLoading(true);
        console.log(formData);
        await putLostFound(lostFoundId, form);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has modificado un objeto correctamente."
        );
        history.push("/lost-founds");
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

  const displayErrors = Object.keys(errors).map((error) => (
    <p className="error-message" key={error}>
      {errors[error].message}
    </p>
  ));

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1>Form para Cosas Perdidas</h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="name">Nombre:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="description">Descripción:</label>
              <br />
            </div>
            <div className="col-80">
              <textarea
                style={{ height: "200px" }}
                id="description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
                required
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="picture">Adjuntar imagen:</label>
              <br />
            </div>
            <div className="col-80">
              {formData.picture !== "" && <div>URL actual: {formData.picture}</div>}
              <UploadButton  onChange={onUpload}/>
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="pickedBy_name">¿Ha sido entregado?:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="checkbox"
                id="pickedUp"
                name="pickedUp"
                value={pickedUp}
                onChange={(e) => onChange(e)}
              />
            <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="pickedBy_name">Nombre del dueño:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="text"
                id="pickedBy_name"
                name="pickedBy_name"
                value={pickedBy_name}
                onChange={(e) => onChange(e)}
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="pickedBy_mail">Mail del dueño:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="text"
                id="pickedBy_mail"
                name="pickedBy_mail"
                value={pickedBy_mail}
                onChange={(e) => onChange(e)}
              />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="pickedBy_phone">Teléfono del dueño:</label>
              <br />
            </div>
            <div className="col-80">
              <input
                type="text"
                id="pickedBy_phone"
                name="pickedBy_phone"
                value={pickedBy_phone}
                onChange={(e) => onChange(e)}
              />
              <br />
            </div>
          </div>
          <div className="row">
            <input type="submit" value="Publicar" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(LostFoundEditor);
