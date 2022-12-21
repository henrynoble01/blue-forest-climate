import { IPost } from "../infrastructure/schema";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addNewComment,
  getPostByPostId,
  getRealTimeComments,
  IComment,
  streamCommentsForArticle,
} from "../infrastructure/persistence/firestore";
import { Button, Loader, Paper, Tooltip } from "@mantine/core";
import { Cloudinary } from "@cloudinary/url-gen";
import { cloudName } from "../components/upload-widget";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "@cloudinary/react";
import {
  IconBold,
  IconClock,
  IconItalic,
  IconSend,
  IconUser,
} from "@tabler/icons";
import StarterKit from "@tiptap/starter-kit";
import { useEditor } from "@tiptap/react";
import { RichTextEditor } from "@mantine/tiptap";
import { getAuthObject } from "../infrastructure/persistence/auth";
import { User } from "firebase/auth";

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
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Post Comment</p>",
  });

  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [userEmail, setUserEmail] = useState<string>("");
  const [loadState, setLoadState] = useState<boolean>(false);

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

  function postedByVal(displayName: any, email: any) {
    const postedBy = displayName || email?.split("@")[0];

    return String(postedBy).toLocaleLowerCase();
  }

  useEffect(() => {
    // streamGroceryListItems()
    const unsubscribe = streamCommentsForArticle(
      post.postId,
      (querySnapshot: any) => {
        const updatedGroceryItems = querySnapshot.docs.map((docSnapshot: any) =>
          docSnapshot.data()
        );
        setCommentList(updatedGroceryItems);
      },
      (error: any) => {} //setError("grocery-list-item-get-fail")
    );
    return unsubscribe;
  }, [post.postId]);
  // const  getRealTimeComments(post.postId!).then((res) => {
  //   console.log(res);
  //   setCommentList(res);
  // });

  useEffect(() => {
    const user = getAuthObject();
    setUserEmail(user?.email!);
  }, []);

  const createNewComment = () => {
    setLoadState(true);
    const user = getAuthObject();

    const comment: IComment = {
      message: editor?.getHTML()!,
      datePosted: new Date(),
      postedBy: user?.displayName!,
      postedByEmail: user?.email!,
      postId: post.postId!,
    };
    addNewComment(comment)
      .then(() => {
        setLoadState(false);
      })
      .catch(() => {
        setLoadState(true);
      });
  };

  return (
    <div className='container prose  max-w-prose  mx-auto p-4'>
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
        <div className=''>
          <div
            // className='prose lg:prose-xl text-base prose prose-truegray xl:text-xl'
            className='prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none'
            dangerouslySetInnerHTML={{ __html: post?.content as string }}
          />
        </div>

        <div className='mt-4  '>
          <h4 className=''>Comments</h4>
          {commentList.length > 0 ? (
            <div className='border border-slate'>
              {commentList.map((item, index) => (
                <div className='not-last:border-b border-slate p-2' key={index}>
                  <div
                    className=''
                    dangerouslySetInnerHTML={{ __html: item.message }}
                  ></div>
                  <div className=''>
                    <div className='text-gray flex gap-3 items-center'>
                      <IconUser color='#9e9e9e' size={20} />
                      <span className=''>
                        {" "}
                        posted by{" "}
                        {postedByVal(item.postedBy, item.postedByEmail)}{" "}
                      </span>
                    </div>
                    {/* posted by  */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className=''>No Comment Yet</div>
          )}
          <div className='mt-3 '>
            <RichTextEditor editor={editor}>
              <RichTextEditor.Toolbar>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold
                    icon={({ size }) => <IconBold size={size} stroke={3.5} />}
                  />
                  <RichTextEditor.Italic
                    icon={({ size }) => <IconItalic size={size} stroke={3.5} />}
                  />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
            <div className='mt-2'>
              {userEmail ? (
                <Button
                  rightIcon={<IconSend />}
                  className='w-full'
                  disabled={!userEmail}
                  onClick={createNewComment}
                  loading={loadState}
                >
                  Send
                </Button>
              ) : (
                <Tooltip
                  label='You need to be logged in to post comments'
                  multiline
                >
                  <Button
                    rightIcon={<IconSend />}
                    className='w-full'
                    variant='outline'
                  >
                    Send
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ViewPosts;
