import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      onClick={
        (() => {
          window.location.reload();
        },
        1)
      }
    >
      <div className="w-full bg-[#7A8A8A] shadow-2xl  rounded-xl p-1 ">
        <div
          className=" w-full h-[45vh] 
          flex flex-wrap justify-center 
        items-center "
        >
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl 
            h-[100%] w-[100%] 
            bg-contain bg-center"
          />
        </div>
        <div className="w-full mt-2 bg-[#36454f] rounded-xl p-1 overflow-hidden">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
