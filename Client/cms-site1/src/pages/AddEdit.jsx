import { useEffect, useState } from "react";
import axios from "../../config/instance";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";

export default function FormAddEdit({ type }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [formInput, setFormInput] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imgUrl: "",
        categoryId: "",
        authorId: localStorage.id_user
    });

    const [errorMessages, setErrorMessage] = useState("");

    const handlerSubmit = async (e) => {
        try {
            e.preventDefault();

            const { data } = await axios({
                method: type ? "put" : "post",
                url: type ? `/products/${id}` : "/products",
                data: formInput,
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                }
            });

            Swal.fire("Done!", `Success ${type || "add"} data`, "success");

            setTimeout(() => {
                navigate('/');
            }, 500);

        } catch (error) {
            let errors = error.response.data.message;
            let errorMessages = errors;

            if (Array.isArray(errors) && errors.length > 1) {
                errorMessages = errors.map(el => ' ' + el).join(', ');
            }

            Swal.fire({
                icon: 'error',
                title: `Failed to ${type} data`,
                text: errorMessages
            });
        }
    };

    const fetchCategories = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: "/categories",
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                }
            });
            setCategories(data);
            console.log(data, "ini dataaaa categories");
          
         
        } catch (error) {
            console.log(error, "eror di sinii");
            Swal.fire({
                icon: 'error',
                title: 'hmmm...',
                text: `${error.response?.data}`
            });
        }
    };

    const getDetail = async () => {
        try {
            const { data } = await axios({
                method: 'get',
                url: `/products/${id}`,
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`
                }
            });

            setFormInput(data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormInput({
            ...formInput,
            [name]: value
        });
    };

    useEffect(() => {
        if (type) {
            getDetail();
        }
        fetchCategories();
    }, []);

    return (
        <div className="container mt-5 pt-5">
            <div className="d-flex align-items-center justify-content-center" style={{ height: '85vh' }}>
                <div className="w-50 p-5" style={{ backgroundColor: "#f8f9fa", borderRadius: 12, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                    <h3 className="text-center mb-5" style={{ fontSize: "2rem", fontWeight: "bold" }}>Form {type !== "edit" ? "Add" : type} Product</h3>
                    {errorMessages && <div className="alert alert-danger">{errorMessages}</div>}
                    <form onSubmit={handlerSubmit}>
                        <div className="mb-3">
                            <input type="text" placeholder="Name" name="name" id="name" className="form-control" value={formInput.name} onChange={changeHandler} style={{ height: "3rem" }} />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Description" name="description" id="description" className="form-control" value={formInput.description} onChange={changeHandler} style={{ height: "3rem" }} />
                        </div>
                        <div className="mb-3">
                            <input type="number" placeholder="Price" name="price" id="price" className="form-control" value={formInput.price} onChange={changeHandler} style={{ height: "3rem" }} />
                        </div>
                        <div className="mb-3">
                            <input type="number" placeholder="Stock" name="stock" id="stock" className="form-control" value={formInput.stock} onChange={changeHandler} style={{ height: "3rem" }} />
                        </div>
                        <div className="mb-3">
                            <input type="text" placeholder="Image Url" name="imgUrl" id="imgUrl" className="form-control" value={formInput.imgUrl} onChange={changeHandler} style={{ height: "3rem" }} />
                        </div>
                        <div className="mb-4">
                            <select name="categoryId" className="form-control" value={formInput.categoryId} onChange={changeHandler} style={{ height: "3rem" }}>
                                <option value="" disabled>Select Category</option>
                                {categories.map(el => (
                                    <option key={el.id} value={el.id}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                        <Button page="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
