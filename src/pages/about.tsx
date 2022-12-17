import protectImage from "../assets/global-warming..webp";

const About = () => {
  return (
    <div className=''>
      {/* <div className='  relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl lg: mb-24 h-auto pt-24 lg:min-h-[40rem] lg:pb-12 lg:mb-64'>
        <div className='col-span-full pt-6 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col lg:col-span-5'>
          <div className='flex flex-auto flex-col' style={{ opacity: 1 }}>
            <div className='opacity: 1; transform: none;'>
              <h2 className='leading-tight text-3xl md:text-4xl text-black dark:text-white'>
                What is Blue Forest
                To Preserve and protect the environment as much as possible
                Hi,
                Helping to preserve and protect the environment and
              </h2>
            </div>
            <div className='opacity: 1; transform: none;'>
              <p className='leading-tight text-xl md:text-2xl text-gray-400 dark:text-slate-500 mt-3'>
                
                Everyone can help limit climate change. From the way we travel,
                to the electricity we use, the food we eat, and the things we
                buy, we can make a difference.
              </p>
            </div>
          </div>
          <p className=''></p>
        </div>
        <div className='col-span-full mb-12 lg:mb-0 px-10 lg:col-span-5 lg:col-start-7'>
          <img
            src={protectImage}
            alt=''
            className='rounded-8'
            width={"400px"}
            height={"400px"}
          />
        </div>
      </div>
      <div className=''>
        // built for the 2022 atlasian hackaton as solution to climate change
      </div> */}

      <div className='block-content'>
        <div>
          <div
            className='relative p-8 overflow-hidden bg-blend-multiply bg-no-repeat bg-cover lg:bg-right min-h-[50vh]'
            style={{
              backgroundImage: `url(${protectImage})`,
              backgroundColor: "hsla(0,0%, 0%, .55)",
            }}
          >
            <div className='text-center my-6 relative '>
              <div className='text-6xl text-white font-bold mb-1'>What Is</div>
              <div className='text-6xl text-white font-bold mb-4'>
                Blue Forest
              </div>
              <div
                className='mt-0 mb-4 line-height-3  text-center mx-auto text-white mt-6'
                style={{ maxWidth: 700 }}
              >
                <blockquote className='text-2xl italic font-semibold text-white dark:text-white'>
                  <p>
                    Blue Forest is a tool that aims to help people to know more
                    about their surroundings and sharing of knowledge to protect
                    the environment and reduce climate change
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
