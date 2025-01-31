import React, { useState, useRef } from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { addDocument } from "../../../firebase/dbService";
import { uploadFile } from "../../../firebase/storageService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeatherIcon from "feather-icons-react";
import ImageUpload from "../../../Components/ImageUpload";
import TextEditor from "../InformationCard/TextEditor";

const AddBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageError, setImageError] = useState('');
    const editorRef = useRef(null);

    const handleImageLoad = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newImageUrl = URL.createObjectURL(file);
            setImageFile(file);
            setImageUrl(newImageUrl);
            setImageError('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !author || !tags || !content || !imageFile) {
            toast.error('Please fill in all required fields.', { autoClose: 2000 });
            return;
        }

        setLoading(true);

        try {
            let imagePath = "";
            const toastId = toast.loading("Uploading image...");
            
            try {
                imagePath = `blogs/${Date.now()}-${imageFile.name}`;
                await uploadFile(imageFile, imagePath);
                toast.update(toastId, { 
                    render: "Image uploaded successfully!", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 2000 
                });
            } catch (error) {
                toast.update(toastId, { 
                    render: "Image upload failed: " + error.message, 
                    type: "error", 
                    isLoading: false, 
                    autoClose: 2000 
                });
                throw error;
            }

            const cleanedTags = tags.split(",").map(tag => tag.trim());

            const blogData = {
                title,
                author,
                tags: cleanedTags,
                content,
                image: imagePath,
                publicationDate: new Date().toISOString(),
                views: 0,
                createdAt: new Date().toISOString()
            };

            await addDocument('blogs', blogData);
            sessionStorage.setItem('addBlogSuccess', 'true');
            navigate("/blogview");

        } catch (error) {
            toast.error('Error adding blog: ' + error.message, { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-wrapper">
            <ToastContainer />
            <Header />
            <Sidebar id="menu-item11" id1="menu-items11" activeClassName="add-blog" />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/blogview">News</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <FeatherIcon icon="chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Add News</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="form-heading">
                                                    <h4>News Details</h4>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>News Title <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        disabled={loading}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Author Name <span className="login-danger">*</span></label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={author}
                                                        onChange={(e) => setAuthor(e.target.value)}
                                                        disabled={loading}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>Tags <small>(separated with a comma)</small> <span className="login-danger">*</span></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={tags}
                                                        onChange={(e) => setTags(e.target.value)}
                                                        disabled={loading}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-12">
                                                <div className="form-group summer-mail">
                                                    <label>Content <span className="login-danger">*</span></label>
                                                    <TextEditor 
                                                        ref={editorRef} 
                                                        onChange={(data) => setContent(data)} 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-12">
                                                <div className="form-group local-top-form">
                                                    <ImageUpload id="image" src={imageUrl} loadFile={handleImageLoad} imageName="Image" />
                                                    {imageError && <div className="text-danger">{imageError}</div>}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="doctor-submit text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary submit-form me-2"
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Publishing..." : "Publish"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary cancel-form"
                                                        disabled={loading}
                                                        onClick={() => navigate("/blogview")}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sidebar-overlay" data-reff="" />
        </div>
    );
};

export default AddBlog;
