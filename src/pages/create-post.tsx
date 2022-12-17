import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Center,
  FileInputProps,
  Grid,
  Group,
  MultiSelect,
  NumberInput,
  Paper,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCheck, IconPhoto, IconUpload } from "@tabler/icons";
import { useNavigate, useParams } from "react-router-dom";
import { IPost, ITag, PostSchema } from "../infrastructure/schema";
import {
  addNeTag,
  addNewPost,
  getPostByPostId,
  getTags,
} from "../infrastructure/persistence/firestore";
import { useEffect, useState } from "react";
import CloudinaryUploadWidget from "../components/upload-widget";
import { showNotification, updateNotification } from "@mantine/notifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../infrastructure/persistence/firebase";
import { useSetState } from "@mantine/hooks";
import { getAuthObject } from "../infrastructure/persistence/auth";
// import { getAuthObject } from "../infrastructure/persistence/auth";

const CreatePost = () => {
  const navigate = useNavigate();
  const [loadState, setLoadState] = useState(false);
  const [tagList, setTagList] = useState<ITag[]>([]);
  let { postId } = useParams<{ postId: string }>();

  const form = useForm({
    initialValues: {
      title: "",
      shortDescription: "",
      estimatedReadingTime: 0,
      status: "PRIVATE",
      content: "",
      img: "",
      tags: [] as string[],
    },
    validate: zodResolver(PostSchema),
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const [postedBy, setPostedBy] = useSetState({
    displayName: "",
    email: "",
    uid: "",
  });

  useEffect(() => {
    getTags().then((val) => setTagList(val));
  }, []);

  useEffect(() => {
    if (postId) {
      getPostByPostId(postId).then((res) => {
        editor?.commands.insertContent(res.content);
        // console.log(res.content);

        form.setValues(res);
      });
    }
  }, []);

  useEffect(() => {
    const user = getAuthObject();

    setPostedBy({
      displayName: user?.displayName!,
      email: user?.email!,
      uid: user?.uid,
    });
  }, []);

  const submit = async (values: IPost | any) => {
    // first submit Picture
    if (!form.values.img) {
      showNotification({
        title: "Image Missing",
        message: "Please Upload an image",
        color: "red",
      });

      return;
    }

    showNotification({
      id: "load-data",
      loading: true,
      title: "Saving Post",
      message: "Post is currently Saving",
      autoClose: false,
      disallowClose: true,
    });

    setLoadState(true);

    const postData = {
      ...values,
      ...postedBy,
      content: editor?.getHTML(),
      postId: crypto.randomUUID(),
    };

    await addNewPost(postData)
      .then((res) => {
        console.log(res);
        setLoadState(false);
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Post Saved",
          message: "Post was saved successfully",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      })
      .catch(() => {
        setLoadState(false);
      });
  };

  const handleImageUrl = (url: string) => {
    form.setFieldValue("img", url);
  };

  return (
    <div className=''>
      <div className='container mx-auto bg-white  p-4 rounded-md shadow-lg'>
        <form onSubmit={form.onSubmit(submit)}>
          <Paper shadow='xs' p='md'>
            <Group position='apart'>
              <Button type='button' onClick={() => navigate("/my-posts")}>
                Back
              </Button>
              <div className='flex gap-3'>
                <CloudinaryUploadWidget setImgUrl={handleImageUrl} />

                <Button type='submit' loading={loadState}>
                  Save
                </Button>
              </div>
            </Group>
          </Paper>
          <Grid grow>
            <Grid.Col lg={6} md={12}>
              <TextInput
                // className='w-3/5'
                mt='md'
                label='Title'
                placeholder='Title'
                description='The title of the post'
                {...form.getInputProps("title")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={12}>
              <NumberInput
                mt='md'
                label='Estimated Reading time(minutes)'
                placeholder='Estimated Reading Time'
                description='the amount of time you estimate for the readers to finish this post'
                defaultValue={1}
                min={1}
                {...form.getInputProps("estimatedReadingTime")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={12}>
              <Select
                mt='md'
                label='Status'
                placeholder='Status'
                description='This determines if the post is seen by the others'
                data={[
                  { value: "PRIVATE", label: "PRIVATE" },
                  { value: "PUBLISHED", label: "PUBLISHED" },
                ]}
                {...form.getInputProps("status")}
              />
            </Grid.Col>
            <Grid.Col lg={6} md={12}>
              <MultiSelect
                mt='md'
                label='Post Tags'
                description='tags about posts'
                data={tagList}
                placeholder='Select items'
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                onCreate={async (query) => {
                  const item = { value: query, label: query };
                  // console.log(item);
                  await addNeTag(item);
                  setTagList((current) => [...current, item]);
                  return item;
                }}
                {...form.getInputProps("tags")}
              />
            </Grid.Col>
            {/* <Grid.Col lg={6} md={12}>
              <FileInput
                mt='md'
                label='Post Image'
                placeholder='Image'
                icon={<IconUpload size={14} />}
                valueComponent={ValueComponent}
                {...form.getInputProps("img")}
                accept='image/*'
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <Textarea
                mt='md'
                placeholder='Short Description'
                label='Short Description/Summary of the post'
                description='this should not be longer than 40 characters'
                // withAsterisk
                {...form.getInputProps("shortDescription")}
              />
            </Grid.Col>
          </Grid>

          <div className='mt-4'>
            <p className='font-600   '>Content</p>
            <RichTextEditor
              editor={editor}
              placeholder='Content of your post'
              {...form.getInputProps("content")}
            >
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
        </form>
      </div>
    </div>
  );
};

function Value({ file }: { file: File }) {
  return (
    <Center
      inline
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[7]
            : theme.colors.gray[1],
        fontSize: theme.fontSizes.xs,
        padding: "3px 7px",
        borderRadius: theme.radius.sm,
      })}
    >
      <IconPhoto size={14} style={{ marginRight: 5 }} />
      <span
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          maxWidth: 200,
          display: "inline-block",
        }}
      >
        {file.name}
      </span>
    </Center>
  );
}

const ValueComponent: FileInputProps["valueComponent"] = ({ value }) => {
  if (Array.isArray(value)) {
    return (
      <Group spacing='sm' py='xs'>
        {value.map((file, index) => (
          <Value file={file} key={index} />
        ))}
      </Group>
    );
  }

  return <Value file={value!} />;
};

export default CreatePost;
