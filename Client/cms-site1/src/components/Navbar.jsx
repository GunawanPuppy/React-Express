import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2"



export default function Navbar(){
  const navigate = useNavigate()
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Yakin mau logout brooo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes"
    })

    if(result.isConfirmed){
      localStorage.clear()
      Swal.fire({
        title: "BYE BYE!!!!!",
        text: "Logout Success",
        icon: "success"
      })

      setTimeout(() => {
        navigate("/login")
      },500)
    }

  }
    return (
        <>
  {/* Navbar */}
  <nav className="navbar navbar-expand-lg fixed-top">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand me-auto">
        Products
      </Link>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Products
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
            <li className="nav-item">
              <Link to="/"
                className="nav-link mx-lg-2 active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products/add" className="nav-link mx-lg-2"> 
                Add Product
                </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link mx-lg-2">
                Add Staff
                </Link>
            </li>
            <li className="nav-item">
              <Link to="/categories" className="nav-link mx-lg-2">
                Categories
                </Link>
            </li>
          </ul>
        </div>
      </div>
      <button className = "btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
  </nav>
  {/* End Navbar */}
</>

    )
}