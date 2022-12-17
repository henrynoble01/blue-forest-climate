import { IPost } from "../infrastructure/schema";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../infrastructure/persistence/firestore";
import { Button, Loader, Paper } from "@mantine/core";
import { Cloudinary } from "@cloudinary/url-gen";
import { cloudName } from "../components/upload-widget";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import { IconClock, IconUser } from "@tabler/icons";

const ViewPosts = () => {
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

  function imageFunc() {}

  return (
    <div className=''>
      {postData ? (
        <>
          <BlogPage {...postData} />
        </>
      ) : (
        <div className='container mx-auto'>
          <div className='flex justify-center items-center'>
            <Loader size='xl' />
          </div>
        </div>
      )}
    </div>
  );
};

const BlogPage: React.FC<IPost> = (post) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  // const myImage = cld.image(post.img);
  const myImage = cld.image(post.img_public_id);

  myImage.resize(thumbnail().height(500)).format("png");

  function postedBy() {
    const postedBy = post.displayName || post.email?.split("@")[0];

    return String(postedBy).toLocaleLowerCase();
  }

  return (
    <div className='container  mx-auto p-4'>
      <Paper shadow='sm' p='md'>
        <div className=''>
          <AdvancedImage cldImg={myImage} />
        </div>
        <div className='flex gap-3 my-3'>
          {post.tags.map((s, i) => (
            <Button key={i}>{s}</Button>
          ))}
        </div>
        <div className=''>
          <h2 className='text-slate-700 text-4xl'> {post.title} </h2>
          <p className='text-slate-500 text-2xl my-3'>
            {post.shortDescription}
          </p>
        </div>
        <div className='mt-4 flex gap-3'>
          <div className='text-gray flex gap-3 items-center'>
            <IconUser color='#9e9e9e' size={20} />
            <span className=''> posted by {postedBy()} </span>
          </div>

          <div className='text-gray flex gap-3 items-center'>
            <IconClock color='#9e9e9e' size={20} />
            <span className=''>
              estimated {post.estimatedReadingTime} minutes
            </span>
          </div>
        </div>
        <div
          className=''
          dangerouslySetInnerHTML={{ __html: post?.content as string }}
        />
      </Paper>
    </div>
  );
};

export default ViewPosts;
