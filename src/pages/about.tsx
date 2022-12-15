import protectImage from "../assets/global-warming..webp";

const About = () => {
  return (
    <div className=''>
      <div className='  relative grid grid-cols-4 gap-x-4 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6 mx-auto max-w-7xl lg: mb-24 h-auto pt-24 lg:min-h-[40rem] lg:pb-12 lg:mb-64'>
        <div className='col-span-full pt-6 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col lg:col-span-5'>
          <div className='flex flex-auto flex-col' style={{ opacity: 1 }}>
            <div className='opacity: 1; transform: none;'>
              <h2 className='leading-tight text-3xl md:text-4xl text-black dark:text-white'>
                Hi, Helping to preserve and protect the environment and
              </h2>
            </div>
            <div className='opacity: 1; transform: none;'>
              <p className='leading-tight text-3xl md:text-4xl text-gray-400 dark:text-slate-500 mt-3'>
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
        built for the 2022 atlasian hackaton as solution to climate change
      </div>
    </div>
  );
};

export default About;
