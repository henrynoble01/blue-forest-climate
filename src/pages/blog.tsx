import { Button, Divider } from "@mantine/core";
import { IconCalendarTime, IconClock } from "@tabler/icons";

const Blog = () => {
  return (
    <div className='mt-2'>
      <div className='flex flex-col gap-5'>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((p, i) => (
          <div
            className='bg-white rounded-5 shadow-md my-2 overflow-hidden'
            key={i}
          >
            <div className=''>
              <a className=''>
                <img
                  src='https://blog.echosec.top/p/chatgpt-antirules/naifan-zhang-4_hu3e631bccb1a1bbdefca010a85222fc9f_376773_1600x0_resize_q75_box.jpg'
                  alt=''
                  className='object-cover h-[150px] lg:h-[250px] md:h-[200px]  w-full'
                  loading='lazy'
                />
              </a>
            </div>

            <div className='p-4'>
              <div className='flex gap-3'>
                <Button>Climate</Button>
                <Button>Global Warming</Button>
                <Button>Energy Savings</Button>
              </div>
              <h5 className='font-700 text-xl'>
                Lorem ipsum dolor sit amet consectetur adipisicing
              </h5>
              <p className='text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
                accusamus, adipisci impedit sed sint animi eos nesciunt sunt
                quas id veritatis earum deserunt fugit temporibus aspernatur
                excepturi. Est, nulla veniam.
              </p>
              <div className='mt-4 flex gap-3'>
                <div className='text-gray flex gap-3 items-center'>
                  <IconCalendarTime color='#9e9e9e' size={20} />
                  <span className=''>2022-12-14</span>
                </div>

                <div className='text-gray flex gap-3 items-center'>
                  <IconClock color='#9e9e9e' size={20} />
                  <span className=''>estimated 3 minutes</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
