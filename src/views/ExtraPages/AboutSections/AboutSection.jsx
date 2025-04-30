import { memo, useState } from "react";
const AboutSection = memo(() => {  
  return (
    <section className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <div className='px-2'>
              {/* <h2>Masterminds Team</h2> */}
              <p>
              ARYZAP.com is a video streaming platform, where you can watch all dramas, comedy shows, tv shows like jeeto pakistan, latest news about sports, video songs and trailers of all hit pakistani movies and much more in HD Quality.
              </p>
              <p>
              Our mission is to provide best qulaity result and fast streaming to our users, you can enjoy fast streaming at home, outside home, while travelling etc with ARYZAP.com. Now we don't need to stay at home for enjoying fast streaming like TV Channels giving us, ARYZAP.com is like an online cinema.
              </p>
              <p className='mb-0'>
              This is not only for desktop users, but you can enjoy streaming on your mobile, tablets, ipads through our mobile app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";
export default AboutSection;
