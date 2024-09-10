import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../config/instance";
import Maudy from "../assets/images.jpeg";
import Button from "../components/Button";
import Swal from "sweetalert2";

export default function Login() {
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();

      let { data } = await axios({
        method: "post",
        url: "/login",
        data: inputLogin,
      });

      console.log(data, "ini dataaaa");
      localStorage.id_user = data.id;
      localStorage.role = data.role;
      localStorage.access_token = data.access_token;

      Swal.fire({
        icon: "success",
        title: "Berhasil Login!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.log(error, "Error di login");
      Swal.fire({
        icon: "error",
        title: "Login GAGAL!!!!!!",
        text: "Silahkan Coba lagi",
      });
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputLogin({
      ...inputLogin,
      [name]: value,
    });
  };

  return (
    <>
      <div className="bg">
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <div className="card flex-row">
            <div className="mr-4">
              <img
                src={Maudy}
                alt="Foto Model"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>
            <div className="flex-col">
              <div className="form-group mb-lg-2 mt-2">
                <h2 className="card-title text-center">Absolute</h2>
              </div>
              <div className="mt-3 login-form">
                <form className="" onSubmit={handlerSubmit}>
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      id="email"
                      placeholder="Email"
                      className="form-control"
                      value={inputLogin.email}
                      name="email"
                      onChange={changeHandler}
                    />
                  </div>
                  <div className="form-group mb-lg-3">
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="form-control"
                      value={inputLogin.password}
                      name="password"
                      onChange={changeHandler}
                    />
                    <br />
                  </div>
                  <Button type="submit" page="Login" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
