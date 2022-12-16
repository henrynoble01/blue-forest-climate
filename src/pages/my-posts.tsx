import { Button, Table } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

const MyPosts = () => {
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
          <Table verticalSpacing='xs' fontSize='md'>
            <thead>{ths}</thead>
          </Table>
        </div>
      </div>
    </div>
  );
};

const ths = (
  <tr>
    <th>Post Title</th>
    <th>Post Created</th>
    <th>Post Published Date</th>
    <th>Status</th>
  </tr>
);

export default MyPosts;
