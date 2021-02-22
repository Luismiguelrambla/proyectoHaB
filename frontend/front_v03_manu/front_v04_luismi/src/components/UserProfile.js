import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import validate from "./validateInfo";
import useAuth from "../shared/hooks/useAuth";
import "../css/Form.css";
import FormSignup from "./FormSignup";
import { useForm } from "react-hook-form";
import { getUserInfo } from "../http/api";

const UserProfile = () => {
  const { userData } = useAuth();
  const [profileData, setprofileData] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    getUserInfo(userData.id).then((data) => {
      setprofileData(data);
    });
  }, [userData.id]);

  const onSubmit = async (idEspacios, fechaLlegada, fechaSalida) => {};

  return (
    <div className="form-container">
      <span className="close-btn">x</span>
      <div className="form-content-left">
        <img
          src="images/User-Avatar.svg"
          alt="spaceship"
          className="form-img"
        />
      </div>
      <div className="form-content-right">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <h1>
            Get started with us today! Create your account by filling out the
            information below.
          </h1>
          <div className="form-inputs">
            <label htmlFor="username" className="form-label">
              Nombre
            </label>
            <input
              id="username"
              type="text"
              name="nombre"
              ref={register()}
              className="form-input"
              value={profileData.nombre}
            />
            {errors.nombre && <p>{errors.nombre}</p>}
          </div>
          <div className="form-inputs">
            <label htmlFor="apellidos" className="form-label">
              Apellidos
            </label>
            <input
              id="apellidos"
              type="text"
              name="apellidos"
              ref={register()}
              className="form-input"
              value={profileData.apellidos}
            />
            {errors.apellidos && <p>{errors.apellidos}</p>}
          </div>
          <div className="form-inputs">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              ref={register()}
              className="form-input"
              value={profileData.correo}
            />
            {errors.correo && <p>{errors.correo}</p>}
          </div>
          <div className="form-inputs">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              ref={register()}
              className="form-input"
              placeholder="Enter your password"
            />
            {errors.contraseña && <p>{errors.contraseña}</p>}
          </div>
          <button className="form-input-btn" type="submit">
            Save
          </button>
          <span className="form-input-login">
            Click <Link to="/">here</Link> to cancel changes
          </span>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
