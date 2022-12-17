import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { Button, Divider, Grid } from "@mantine/core";
import { IconCalendarTime, IconClock, IconUser } from "@tabler/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cloudName } from "../components/upload-widget";
import { getPostForUsers } from "../infrastructure/persistence/firestore";
import { IPost } from "../infrastructure/schema";

const Blog = () => {
  const [postList, setPostList] = useState<IPost[]>([]);

  useEffect(() => {
    getPostForUsers().then((res) => setPostList(res));
  }, []);

  return (
    <div className='mt-2 container mx-auto'>
      <div className='flex flex-col gap-5'>
        <Grid>
          {postList.map((p, i) => (
            <Grid.Col lg={4} md={6} sm={12} className='' key={i}>
              <BlogItem {...p} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </div>
  );
};

const BlogItem: React.FC<IPost> = (post) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: cloudName,
    },
  });

  // const myImage = cld.image(post.img);
  const myImage = cld.image(post.img_public_id);

  myImage.resize(thumbnail().height(300)).format("png");

  function postedBy() {
    const postedBy = post.displayName || post.email?.split("@")[0];

    return String(postedBy).toLocaleLowerCase();
  }

  return (
    <div className='bg-white rounded-5 shadow-md my-2 overflow-hidden'>
      <div className=''>
        <Link to={`/view-post/${post.postId}`} className='flex justify-center'>
          <AdvancedImage cldImg={myImage} />
          {/* <img
            src={post.img}
            // src='https://blog.echosec.top/p/chatgpt-antirules/naifan-zhang-4_hu3e631bccb1a1bbdefca010a85222fc9f_376773_1600x0_resize_q75_box.jpg'
            alt=''
            className='object-cover h-[150px] lg:h-[250px] md:h-[200px]  w-full'
            loading='lazy'
          /> */}
        </Link>
      </div>

      <div className='p-6'>
        <div className='flex gap-3'>
          {post.tags.map((s, i) => (
            <Button key={i}>{s}</Button>
          ))}
        </div>
        <h5 className='font-700 text-xl'>
          <Link
            to={`/view-post/${post.postId}`}
            className='no-underline text-slate-800'
          >
            {post.title}
          </Link>
        </h5>
        <p className='text-sm'>{post.shortDescription}</p>
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
      </div>
    </div>
  );
};

export default Blog;
