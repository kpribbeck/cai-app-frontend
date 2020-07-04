import React, { useState, useEffect } from "react";
import { useParams, useLocation, withRouter } from "react-router-dom";
import {
  getObject,
  postObject,
  putObject,
} from "../../requests/ObjectRequests";
import Spinner from "../layout/Spinner";
import UploadButton from "../layout/UploadButton";

const ObjectEditor = ({ createNotification, history }) => {
  const urlParams = useParams();
  const currentUrl = useLocation();

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [objectId, setObjectId] = useState(null);

  const [uploadedfile, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: "",
    picture: "",
    price: "",
  });

  const { name, description, stock, picture, price } = formData;

  // This executes when component is mounted
  // If we are not in /objects/new is because we must be editing a specific object,
  // then we need to get the current data of that object
  useEffect(() => {
    if (currentUrl.pathname !== "/objects/new") {
      getData(urlParams.id);
    }
  }, [urlParams]);

  // makes a GET async call to the DB
  const getData = async (objectId) => {
    try {
      setLoading(true);
      const res = await getObject(objectId);
      setLoading(false);
      setObjectId(res.data.id);
      setFormData({
        name: res.data.name,
        description: res.data.description,
        stock: res.data.stock,
        picture: res.data.picture,
        price: res.data.price,
      });
    } catch (err) {
      setLoading(false);
      console.log("Error: " + err);
    }
  };

  const onChange = (e) => {
    const newState = {
      ...formData,
      [e.target.name]: e.target.value,
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

    try {
      // pass form data to a FormData html5 object, so that file gets sent correctly
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("stock", formData.stock);
      form.append("price", formData.price);
      form.append("picture", formData.picture);
      form.append("file", uploadedfile);

      if (currentUrl.pathname === "/objects/new") {
        // POST
        setLoading(true);
        const res = await postObject(form);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has creado un nuevo objeto correctamente."
        );
        if (formData.price > 0) {
          history.push("/objects");
        } else {
          history.push("/loans");
        }
      } else {
        // PUT
        setLoading(true);
        await putObject(objectId, form);
        setLoading(false);

        createNotification(
          "¡Felicitaciones!",
          "Has modificado un objeto correctamente."
        );
        if (formData.price > 0) {
          history.push("/objects");
        } else {
          history.push("/loans");
        }
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
      <h1 className="titles">Form para Objetos</h1>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            {Object.keys(errors).length > 0 && displayErrors}
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="name">Nombre:</label>
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
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="description">Descripción:</label>
            </div>
            <div className="col-80">
              <textarea
                className="textarea-form"
                id="description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="stock">Stock:</label>
            </div>
            <div className="col-80">
              <input
                type="number"
                min="0"
                id="stock"
                name="stock"
                value={stock}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="picture">Adjuntar imagen:</label>
            </div>
            <div className="col-80">
              {formData.picture !== "" && (
                <div>URL actual: {formData.picture}</div>
              )}
              <UploadButton onChange={onUpload} />
            </div>
          </div>
          <div className="row">
            <div className="col-20">
              <label htmlFor="price">Precio:</label>
            </div>
            <div className="col-80">
              <input
                type="number"
                min="0"
                id="price"
                name="price"
                value={price}
                onChange={(e) => onChange(e)}
                required
              />
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

export default withRouter(ObjectEditor);
