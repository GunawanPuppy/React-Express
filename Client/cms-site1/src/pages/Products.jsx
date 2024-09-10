import { useState,useEffect } from "react"
import TableProduct from "../components/TableProduct"
import axios from "../../config/instance"


export default function Home(){
    const [products, setProducts] = useState([]) //buat ngegantiin data awal

    const fetchProduct = async () => {
        try {
            const {data} = await axios({//ngeaxios dapet data, lalu di destructuring langsung
                method: "get", //method axios
                url: "/products", //url dari server yg pengen ditembak
                headers: {
                    authorization : `Bearer ${localStorage.access_token}` //cara masang token
                }
            })
            console.log(data, "ini data product");
            setProducts(data) //ngeset data awal menjadi data yang ada di form yang nanti diterima oleh products
        } catch (error) {
            console.log(error, "error di home");   
        }
        }

        //di luar function fetch product
        useEffect(() => {
            fetchProduct() 
        }, [])

        return (
        <>
            <div className="container d-flex flex-wrap justify-content-center align-items-center" style={{ minWidth: "90vw" }}>
                <div className="search-bar text-center py-4">
                    <h1 style={{ fontSize: "3rem", marginTop:"25px"}}>List Products</h1>
                </div>
                <div >
                    <table className="table table-bordered">
                        <thead className="table-header" style ={{border : "2px solid black"}}>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Image</th>
                                <th scope="col">Category</th>
                                <th scope="col">Author</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody style ={{border : "2px solid black"}}>
                            {
                                products.map((product, i) => <TableProduct key={i} props={{i, product, fetchProduct }} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}