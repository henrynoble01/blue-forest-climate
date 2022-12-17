import { Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCreationForm from "../components/post-edit-form";
import { getPostByPostId } from "../infrastructure/persistence/firestore";
import { IPost } from "../infrastructure/schema";

const EditPost = () => {
  const [postData, setPostData] = useState<IPost>();
  let { postId } = useParams<{ postId: string }>();

  useEffect(() => {
    if (postId) {
      getPostByPostId(postId).then((res) => {
        setPostData(res);
        // editor?.commands.insertContent(res.content);
        // console.log(res.content);

        // form.setValues(res);
      });
    }
  }, []);

  return (
    <>
      {postData ? (
        <PostCreationForm post={postData} />
      ) : (
        <div className='container mx-auto'>
          <div className='flex justify-center items-center'>
            <Loader size='xl' />
          </div>
        </div>
      )}
    </>
  );
};

export default EditPost;
