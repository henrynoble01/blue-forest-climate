import environment1 from "../assets/environment-2.jpg";
import climateReportCause1 from "../assets/climate-report-cause.png";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className=''>
      <div className=''>
        {/* <header className=''>Let us protect the environment</header> */}
        <div className='block-content'>
          <div>
            <div
              className='relative p-8 overflow-hidden bg-blend-multiply bg-no-repeat  min-h-[50vh]'
              style={{
                backgroundImage: `url(${environment1})`,
                backgroundColor: "hsla(0,0%, 0%, .55)",
              }}
            >
              <div className='text-center my-6 relative '>
                <div className='text-6xl text-white font-bold mb-1'>
                  Welcome To
                </div>
                <div className='text-6xl text-white font-bold mb-4'>
                  Blue Forest
                </div>
                <div
                  className='mt-0 mb-4 line-height-3  text-center mx-auto text-white mt-6'
                  style={{ maxWidth: 700 }}
                >
                  <blockquote className='text-2xl italic font-semibold text-white dark:text-white'>
                    <p>
                      “It's not that the world hasn't had more carbon dioxide,
                      it's not that the world hasn't been warmer. The problem is
                      the speed at which things are changing. - Bill Nye, The
                      Science Guy'
                    </p>
                  </blockquote>
                </div>
                <div className='flex justify-center items-center gap-4'>
                  <Link to='/blog'>
                    <Button color={"green"}>Get Started</Button>
                  </Link>
                  <Link to='/login'>
                    <Button>Login</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className='shadow-lg p-4 mx-auto flex justify-center items-center flex-col  lg:flex-row '>
          <p className='font-600 text-3xl text-center mb-4 '>
            Cause of climate change
          </p>
          <div className=''>
            <img
              src={climateReportCause1}
              alt='climate report 1'
              className='max-w-full'
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
