import { Table } from "@mantine/core";

const MyPosts = () => {
  return (
    <div className=''>
      <div className='container mx-auto'>
        <h3 className=''>My Posts</h3>

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
