import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-4 relative  ">
      <div
        className="h-12 flex
       justify-between items-center
       mx-8 px-12 bg-[#212121] mt-4 rounded
        text-center "
      >
        <h1
          className="text-2xl
         font-bold"
        >
          {post.title}
        </h1>

        {isAuthor && (
          <div className=" w-80 ">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-green-500"
                className="mr-3 hover:bg-green-800"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-500"
              className="hover:bg-red-800"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      <Container className="flex items-center gap-24 mt-4">
        <div
          className="w-1/3 h-[80vh] flex 
        justify-left mb-4 relative rounded-xl  p-2"
        >
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl bg-cover w-full"
          />
        </div>
        {/* <div className="w-full mb-6"></div> */}
        <div
          className="w-[50%] overflow-hidden 
        shadow-2xl rounded-xl "
        >
          <div
            className=" text-wrap 
            text-2xl bg-[#7A8A8A] 
             p-7 rounded-xl "
          >
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
