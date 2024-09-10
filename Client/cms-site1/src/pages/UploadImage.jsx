import axios from "../../config/instance";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { useEffect, useState } from "react";

export default function UploadImage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [image, setImage] = useState(null);
    const [showImage, setShowImage] = useState(null);

    const handlerSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            Swal.fire({
                icon: "error",
                title: "No Image Selected",
                text: "Please select an image to upload",
            });
            return;
        }

        try {
            const formData = new FormData();
            formData.append("image", image);

            const { data } = await axios({
                method: "patch",
                url: `products/${id}`,
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`,
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            });
            Swal.fire("Success", `${data.message}`, "success");

            setTimeout(() => {
                navigate("/");
            }, 500);
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Failed to update image",
                text: error.response?.data?.message || "Something went wrong",
            });
        }
    };

    const getDetail = async () => {
        try {
            const { data } = await axios({
                method: "get",
                url: `/products/${id}`,
                headers: {
                    authorization: `Bearer ${localStorage.access_token}`,
                },
            });
            setProduct(data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to Fetch Product Details",
                text: error.response?.data?.message || "Something went wrong",
            });
        }
    };

    useEffect(() => {
        getDetail();
    }, [id]);

    return (
        <div
            className="d-flex align-items-center justify-content-center pt-5 mt-5"
            style={{ minHeight: "75vh" }}
        >
            <div
                className="w-75 p-3"
                style={{ backgroundColor: "green", borderRadius: 10 }}
            >
                <h3 className="text-center mb-5 text-white" style={{ fontSize: "3rem" }}>
                    Upload {product && product.name}
                </h3>
                <div className="d-flex justify-content-center align-items-center" style={{ gap: 20 }}>
                    {product && (
                        <div className="d-flex flex-column text-white">
                            <h4>Previous Image</h4>
                            <img src={product.imgUrl} width={300} height={200} alt="Previous" />
                        </div>
                    )}
                    {showImage && (
                        <div className="d-flex flex-column text-white">
                            <h4>New Image</h4>
                            <img src={showImage} width={300} height={200} alt="New" />
                        </div>
                    )}
                </div>
                <form onSubmit={handlerSubmit}>
                    <div className="mb-3">
                        <label className="labelForm text-white">Choose an image</label>
                        <input
                            type="file"
                            name="image"
                            className="form-control"
                            style={{ height: "3rem" }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                setImage(file);
                                setShowImage(file ? URL.createObjectURL(file) : null);
                            }}
                        />
                    </div>
                    <Button page="submit" />
                </form>
            </div>
        </div>
    );
}
