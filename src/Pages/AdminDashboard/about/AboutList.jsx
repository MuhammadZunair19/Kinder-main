import { Table } from "antd";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllDocuments, addDocument } from "../../../firebase/dbService";
import { getFileURL, uploadFile } from "../../../firebase/storageService";
import Header from "../../../Components/Header";
import { itemRender, onShowSizeChange } from "../../../Components/Pagination";
import Sidebar from "../../../Components/Sidebar";

const AboutList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateSuccess = sessionStorage.getItem("updateAboutItemSuccess");
    const addSuccess = sessionStorage.getItem("addAboutItemSuccess");
    if (updateSuccess) {
      toast.success("Document updated successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("updateAboutItemSuccess");
    }
    if (addSuccess) {
      toast.success("Document Added successfully!", { autoClose: 2000 });
      sessionStorage.removeItem("addAboutItemSuccess");
    }
    fetchData();
  }, [location]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getAllDocuments('about');
      let data = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const imageUrl = await getFileURL(doc.data().image);
          return {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            imageId: doc.data().image,
            imageUrl: imageUrl,
            imageTitle: doc.data().imageTitle,
            imageSubtitle: doc.data().imageSubtitle,
          };
        })
      );

      if (data.length === 0) {
        // Create dummy data if no documents exist
        const dummyImagePath = 'about/dummy-image.jpg';
        // You should have a dummy image in your assets to upload
        const dummyImageFile = await fetch('/assets/img/dummy-image.jpg').then(res => res.blob());
        const imageUrl = await uploadFile(dummyImageFile, dummyImagePath);
        
        const newDocument = await addDocument('about', {
          title: "Dummy Title",
          description: "Dummy Description",
          image: dummyImagePath,
          imageTitle: "Dummy Image Title",
          imageSubtitle: "Dummy Image Subtitle",
        });

        data.push({
          id: newDocument.id,
          title: "Dummy Title",
          description: "Dummy Description",
          imageId: dummyImagePath,
          imageUrl: imageUrl,
          imageTitle: "Dummy Image Title",
          imageSubtitle: "Dummy Image Subtitle",
        });
      }

      setDataSource(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "S/N",
      dataIndex: "serialNumber",
      key: "serialNumber",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => (
        <img
          src={text}
          alt="Image"
          className="image-column"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Image Title",
      dataIndex: "imageTitle",
      key: "imageTitle",
      render: (text) => (
        <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
      ),
    },
    {
      title: "Image Subtitle",
      dataIndex: "imageSubtitle",
      key: "imageSubtitle",
      render: (text) => (
        <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => (
        <div className={text.length > 20 ? "multiline-text" : ""}>{text}</div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <div
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,  // Number of lines to show
            WebkitBoxOrient: "vertical",
          }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link
                className="dropdown-item"
                to={`/aboutlist/editaboutitem/${record.id}`}
              >
                <i className="far fa-edit me-2" />
                Edit
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />
      <Sidebar
        id="menu-item4"
        id1="menu-items4"
        activeClassName="about"
      />
      <>
        <div className="page-wrapper">
          <div className="content">
            {/* Page Navbar */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="#">About Us</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <i className="feather-chevron-right">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                    <li className="breadcrumb-item active">
                      About
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table show-entire">
                  <div className="card-body">
                    <div className="page-table-header mb-2">
                      <div className="row align-items-center">
                        <div className="col">
                          <div className="doctor-table-blk">
                            <h3>About Us</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive doctor-list">
                      <Table
                        loading={loading}
                        pagination={{
                          total: dataSource.length,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        columns={columns}
                        dataSource={dataSource}
                        rowKey={(record) => record.id}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <ToastContainer />
    </>
  );
};

export default AboutList;
