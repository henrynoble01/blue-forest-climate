import { Button, Table } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyPosts } from "../infrastructure/persistence/firestore";
import { IPost } from "../infrastructure/schema";

const MyPosts = () => {
  const [myPosts, setMyPost] = useState<IPost[]>([]);

  useEffect(() => {
    getMyPosts().then((res) => {
      // console.log(res);
      setMyPost(res);
    });
  }, []);

  return (
    <div className=''>
      <div className='container mx-auto'>
        <div className='flex gap-2'>
          <h3 className=''>My Posts</h3>
          <Link to='/create-post' className='no-underline '>
            <Button variant='outline'>Add Post</Button>
          </Link>
        </div>

        <div className='mt-4'>
          <Table
            verticalSpacing='xs'
            fontSize='md'
            striped
            highlightOnHover
            withBorder
            withColumnBorders
          >
            <thead>{ths}</thead>
            <tbody>
              {myPosts.length
                ? myPosts.map((element, key) => (
                    <tr key={key}>
                      <td>
                        {" "}
                        <Link to={`/edit-post/${element.postId}`}>
                          {" "}
                          edit{" "}
                        </Link>{" "}
                      </td>
                      <td>{element.title}</td>
                      <td>{element.shortDescription}</td>
                      <td>{element.shortDescription}</td>
                      <td>{element.estimatedReadingTime}</td>
                      <td>{element.status}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

// const Rows = (data: IPost[]) => {
//   return (
//     <>
//       {data.map((element) => (
//         <tr key={element.title}>
//           <td>{element.shortDescription}</td>
//           <td>{element.estimatedReadingTime}</td>
//           <td>{element.status}</td>
//         </tr>
//       ))}
//     </>
//   );
// };

const ths = (
  <tr>
    <th>Action</th>
    <th>Post Title</th>
    <th>Short Description</th>
    <th>Estimated Reading Time</th>
    <th>Status</th>
  </tr>
);

export default MyPosts;
