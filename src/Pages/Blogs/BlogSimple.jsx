import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Parallax } from "react-scroll-parallax";
import BlogSimple from '../../Components/Blogs/BlogSimple';
import { getAllDocuments } from '../../firebase/dbService';
import { getFileURL } from '../../firebase/storageService';
import HeaderSection from '../Header/HeaderSection';
import FooterSection from '../Footer/FooterSection';

const BlogSimplePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const querySnapshot = await getAllDocuments('blogs');
        const data = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const imageUrl = await getFileURL(doc.data().image);
            return {
              id: doc.id,
              title: doc.data().title,
              date: doc.data().publicationDate ? new Date(doc.data().publicationDate).toLocaleDateString() : '',
              content: doc.data().content,
              img: imageUrl,
              category: doc.data().tags,
              author: doc.data().author,
            };
          })
        );
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  // Get current blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfFirstBlog + blogsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <HeaderSection theme="light" />
      <div className="py-[80px] h-auto overflow-hidden md:relative md:py-[40px]">
        <Parallax className="lg-no-parallax bg-cover absolute -top-[100px] landscape:md:top-[-20px] left-0 w-full h-[100vh]" translateY={[-40, 40]} style={{ backgroundImage: `url(/assets/img/webp/portfolio-bg2.webp)` }}></Parallax>
        <Container className="h-full relative">
          <Row className="justify-center h-[300px] sm:h-[250px]">
            <Col xl={6} lg={6} md={8} className="text-center flex justify-center flex-col font-serif">
              <h1 className="text-[#028985] mb-[15px] inline-block text-xmd leading-[20px]" >Latest</h1>
              <h2 className="text-darkgray font-medium -tracking-[1px] mb-0">All News</h2>
            </Col>
          </Row>
        </Container>
      </div>
      <section className="overflow-hidden relative px-[5%] pb-[130px] bg-lightgray lg:pb-[90px] lg:px-0 md:pb-[75px] sm:pb-[50px]">
        <Container fluid>
          <Row className="justify-center">
            <Col xl={12} lg={12} sm={10} className="lg:px-0">
              {isLoading ? (
                <div></div>
              ) : (
                <BlogSimple 
                  link="/blogdetail/" 
                  overlay="#028985" 
                  pagination={true} 
                  grid="grid grid-3col xl-grid-2col lg-grid-2col md-grid-1col sm-grid-1col xs-grid-1col gutter-double-extra-large" 
                  data={currentBlogs} 
                  paginate={paginate}
                  currentPage={currentPage}
                  totalBlogs={blogs.length}
                  blogsPerPage={blogsPerPage}
                />
              )}
            </Col>
          </Row>
        </Container>
      </section>
      <FooterSection />
    </>
  );
}

export default BlogSimplePage;
