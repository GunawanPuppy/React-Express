import {createBrowserRouter,redirect} from "react-router-dom"
import Register from "../src/pages/RegisterPage.jsx"
import MainLayout from "../src/pages/MainLayout.jsx"
import Login from "../src/pages/LoginPage.jsx"
import Home from "../src/pages/Products.jsx"
import AddEdit from "../src/pages/AddEdit.jsx"
import CategoryPage from "../src/pages/Category.jsx"
import UploadImage from "../src/pages/UploadImage.jsx"
import Swal from "sweetalert2"


const router = createBrowserRouter([

    {
        path:"/",
        element: <MainLayout/>,
        loader : () => { //Loader harus return sesuatu
            if(!localStorage.access_token){
                return redirect('/login')
            }
            return null
        },
        children : [
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/products/add",
                element:<AddEdit />
            },
            {
                path: "/categories",
                element: <CategoryPage/>
            },
            {
                path:"/register",
                element: <Register/>,
                loader: ()=> {
                    if(localStorage.role !== "admin"){
                        Swal.fire("403", "Ga boleh access Bro Sis", "warning")
                        return redirect("/")
                    }
                    return null
                }
            },
            {
                path: "/products/:id",
                element: <AddEdit type ="edit"/>
            },
            {
                path:"/products/upload/:id",
                element: <UploadImage />
            }
        ]
    },

    {
        path: "/login",
        element : <Login/>,
        loader: () => {
            if (localStorage.access_token){
                return redirect("/")
            }
            return null
        }
    }
])

export default router