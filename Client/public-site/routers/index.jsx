import {createBrowserRouter} from "react-router-dom"
import HomePage from "../src/pages/HomePage"
import MainLayout from "../src/pages/MainLayout"
import DetailPage from "../src/pages/DetailPage"


const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children: [
            {
                path:"",
                element:<HomePage/>
            },
            {
                path: ":id",
                element: <DetailPage/>
            }
        ]
    }
])

export default router