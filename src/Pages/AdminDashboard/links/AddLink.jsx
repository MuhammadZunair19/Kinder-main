import React, { useState, useRef } from "react";
import Header from "../../../Components/Header";
import Sidebar from "../../../Components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { addDocument } from "../../../firebase/dbService";
import { toast, ToastContainer } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import 'react-toastify/dist/ReactToastify.css';
import TextEditor from "../InformationCard/TextEditor";

const AddLink = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const editorRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim() || !description.trim()) {
            toast.error('Please fill in all required fields.', { autoClose: 2000 });
            return;
        }

        setLoading(true);

        try {
            await addDocument('links', {
                title: title,
                description: description,
            });

            sessionStorage.setItem('addLinkSuccess', 'true');
            navigate("/linkslist");
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
                activeClassName="links"
            />
            <div className="page-wrapper">
                <div className="content">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/linkslist">Links</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right">
                                            <FeatherIcon icon="chevron-right" />
                                        </i>
                                    </li>
                                    <li className="breadcrumb-item active">Add Link</li>
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
                                                    <h4>Add Link</h4>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-xl-6">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Title <span className="login-danger">*</span>
                                                    </label>
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
                                            <div className="col-12 col-md-6 col-xl-12">
                                                <div className="form-group local-forms">
                                                    <label>
                                                        Description <span className="login-danger">*</span>
                                                    </label>
                                                    <TextEditor 
                                                        ref={editorRef} 
                                                        onChange={(data) => setDescription(data)} 
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="doctor-submit text-end">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary submit-form me-2"
                                                        disabled={loading}
                                                    >
                                                        {loading ? "Adding..." : "Add"}
                                                    </button>
                                                    <Link to="/linkslist">
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

export default AddLink;
