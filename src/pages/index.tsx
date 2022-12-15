import environment1 from "../assets/environment-2.jpg";

const Index = () => {
  return (
    <div className=''>
      <div className=''>
        {/* <header className=''>Let us protect the environment</header> */}
        <div className='block-content'>
          <div>
            <div
              className='relative p-8 overflow-hidden bg-blend-multiply bg-no-repeat'
              style={{
                backgroundImage: `url(${environment1})`,
                backgroundColor: "hsla(0,0%, 0%, .55)",
              }}
            >
              {/* <img
                src={environment1}
                alt='hero-2'
                className='absolute top-0 left-0 w-full h-full block md:w-full'
                style={{ backgroundColor: "hsla(0,0%, 0%, .55)" }}
              /> */}

              <div className='text-center my-6 relative '>
                <div className='text-4xl text-white font-bold mb-1'>
                  Help Protect
                </div>
                <div className='text-4xl text-white font-bold mb-4'>
                  The Environment
                </div>
                <p
                  className='mt-0 mb-4 line-height-3  text-center mx-auto text-white'
                  style={{ maxWidth: 500 }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
