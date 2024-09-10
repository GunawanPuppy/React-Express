import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../config/instance";
import Button from "../components/Button";
import Swal from "sweetalert2";

export default function Register() {
  const navigate = useNavigate();

  const [inputRegist, setInputRegist] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const handlerSubmit = async (e) => {
    try {
      e.preventDefault();

      await axios({
        method: "post",
        url: "/add-user",
        data: inputRegist,
        headers: {
          authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Cieeee akhirnya berhasil nambahin user",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      let errors = error.response.data.message;
      console.log(errors, "Ini error di register");
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputRegist({
      ...inputRegist,
      [name]: value,
    });
  };

  return (
    <>
      <div className="d-flex" style={{ height: "100vh", width: "100vw" }}>
        <div
          className="w-50 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#FFFACD" }}
        >
          <div>
            <h3 className="text-center mb-5" style={{ fontSize: "3rem" }}>
              Form Add Staff
            </h3>
            <form action="" onSubmit={handlerSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  className="form-control"
                  value={inputRegist.username}
                  onChange={changeHandler}
                  style={{ height: "3rem" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="form-control"
                  value={inputRegist.email}
                  onChange={changeHandler}
                  style={{ height: "3rem" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  value={inputRegist.password}
                  onChange={changeHandler}
                  style={{ height: "3rem" }}
                />
              </div>
              <div className="mb-3">
                <input
                  type="string"
                  placeholder="PhoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  value={inputRegist.phoneNumber}
                  onChange={changeHandler}
                  style={{ height: "3rem" }}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className="form-control"
                  value={inputRegist.address}
                  onChange={changeHandler}
                  style={{ height: "3rem" }}
                />
              </div>
              <Button type="Submit" page="Register" />
            </form>
            <div className="text-black mt-3 text-center">
              Mau nambahin staff ka? Semangat!!!!
              <Link to="/login" style={{ color: "black" }}>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
