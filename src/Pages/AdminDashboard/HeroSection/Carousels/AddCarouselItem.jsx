import React, { useState } from "react";
import Header from "../../../../Components/Header";
import Sidebar from "../../../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import 'react-toastify/dist/ReactToastify.css';
import ImageUpload from "../../../../Components/ImageUpload";
import { addDocument } from "../../../../firebase/dbService";
import { uploadFile } from "../../../../firebase/storageService";

const AddCarouselItem = () => {
    const navigate = useNavigate();
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [loading, setLoading] = useState(false);

    const handleImageLoad = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageURL = URL.createObjectURL(file);
            setImageFile(file);
            setImageURL(newImageURL);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!text.trim()) {
            toast.error("Text is required", { autoClose: 2000 });
            setLoading(false);
            return;
        }

        if (!imageFile) {
            toast.error("Image is required", { autoClose: 2000 });
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            let uploadedImagePath = "";

            if (imageFile) {
                const toastId = toast.loading("Uploading image...");
                try {
                    const filePath = `carousel/${Date.now()}-${imageFile.name}`;
                    await uploadFile(imageFile, filePath);
                    uploadedImagePath = filePath;
                    toast.update(toastId, { render: "Image uploaded successfully!", type: "success", isLoading: false, autoClose: 2000 });
                } catch (error) {
                    toast.update(toastId, { render: "Image upload failed: " + error.message, type: "error", isLoading: false, autoClose: 2000 });
                    throw error;
                }
            }

            await addDocument('heroCarousel', {
                text: text,
                image: uploadedImagePath,
            });

            sessionStorage.setItem('addCarouselItemSuccess', 'true');
            navigate("/herocarousel");

        } catch (error) {
            toast.error('Error adding document: ' + error.message, { autoClose: 2000 });
            console.error('Error adding document: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <Sidebar
                id="menu-item4"
                id1="menu-items4"
                activeClassName="carousel"
            />
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/carousel">Hero Section</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        <Link to="/carousel">Carousel</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Add Carousel Item</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-heading">
                                                    <h4>Add Carousel Item</h4>
                                                </div>
                                            </div>

                                            {/* Text */}
                                            <div className="col-12 col-md-12 col-xl-12">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Text <span className="login-danger">*</span>
                                                    </label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={text}
                                                        onChange={(e) => setText(e.target.value)}
                                                        disabled={loading}
                                                    />
                                                </div>
                                            </div>

                                            {/* Image Upload Component */}
                                            <ImageUpload id="image" src={imageURL} loadFile={handleImageLoad} imageName="Image" />

                                            {/* Submit/Cancel Button */}
                                            <div className="col-12">
                                                <div className="doctor-submit text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary submit-form me-2"
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Adding..." : "Add"}
                                                    </button>
                                                    <Link to="/herocarousel">
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary cancel-form"
                                                            disabled={loading}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <ToastContainer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCarouselItem;
