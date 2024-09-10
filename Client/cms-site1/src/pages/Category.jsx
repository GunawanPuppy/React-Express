import { useState,useEffect } from "react"
import axios from "../../config/instance"

export default function Category(){
    const [Categories, setCategories] = useState([])

    const fetchCategories = async () => {
        try {
            const {data} = await axios({
                method: "get",
                url: "/categories",
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                }
            })
            setCategories(data)
        } catch (error) {
            console.log(error,"di category");
            Swal.fire({
                icon: "error",
                title: "Bingungggg kan luuu",
                text:`${error.response.data.message}`
            })
        }
        }

            useEffect(() => {
                fetchCategories()
            },[])
    return (
        <>
            <div className="container" >
                <div className="text-center py-4">
                    <h1 style={{ fontSize: "3rem", marginTop:"25px"}}>List Categories</h1>
                </div>
                <div>
                    <table className="table table-bordered">
                        <thead className="table-header" style ={{border : "2px solid black"}}>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                            </tr>
                        </thead>
                        <tbody style ={{border : "2px solid black"}}>
                            {
                                Categories.map((category, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{category.name}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}