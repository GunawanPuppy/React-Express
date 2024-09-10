
import axios from "../../config/instance"
import { useParams, Link } from "react-router-dom"
import { useState,useEffect } from "react"


export default function Detail() {
    const { id } = useParams()
    const [products, setProducts] = useState({})

    const fetchDetail = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: `/pub/${id}`
            })

            setProducts(data)
        } catch (error) {
            console.log(error, "ini error ==========")
        }
    }

    useEffect(() => {
        fetchDetail()
    }, [])

    return (
        <>
            <div className="main-content">
                <div className="container">
                    <div className="search-bar text-center py-4">
                        <h1>Details</h1>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card">
                                <img src={products.imgUrl} className="card-img-top" alt="products Image" />
                                <div className="card-body">
                                    <h5 className="card-title">{products.name}</h5>
                                    <p className="card-text">Description: {products.description}</p>
                                    <p className="card-text">Price: {products.price && products.price.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}</p>
                                    <p className="card-text">Stock: {products.stock}</p>
                                    <Link to={'/'} className="btn btn-primary">Back to List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}