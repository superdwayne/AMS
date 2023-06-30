import React, { useEffect, useState } from 'react';

import { Parallax } from 'react-scroll-parallax'
import { ParallaxBanner } from "react-scroll-parallax";
import { useParallax } from "react-scroll-parallax";
import axios from 'axios';
import { Player } from 'video-react';
import './App.css';

const birdWeatherVideo = './video/birds.mp4';
const coldWeatherVideo = './video/grey.mp4';
const warmWeatherVideo  = './video/fff.mp4';

const warmWeatherImage = 'https://images.unsplash.com/photo-1517495306984-f84210f9daa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80'
const coldWeatherImage = 'https://images.unsplash.com/photo-1548266652-99cf27701ced?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'



function Weather() {
  
  const [weatherData, setWeatherData] = useState(null);
  const [backgroundVideo, setBackgroundVideo] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3002/weather')
      .then(response => {
        setWeatherData(response.data.weatherData);
        console.log(response.data.weatherData.currentTemp)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (weatherData) {
      if (weatherData.currentTemp < 20) {
        setBackgroundVideo(coldWeatherVideo);
      } else {
        setBackgroundVideo(warmWeatherVideo);
      }
    }
  }, [weatherData]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>    
      <Player
        playsInline
        autoPlay
        muted
        loop
        src={backgroundVideo}
        className="background-video"
      />

    <section className='wrapper'>
      <img className='logo' src='./Logo_Overview_bk.png' alt='AMQ' style={{width: '152px'}} />

      <span className='weatherData'>  
        <h1>{weatherData.cityName}</h1>
        <p>{weatherData.coordslon} {weatherData.coordslat}</p>
      </span> 
      </section> 

    </>
  );
}

function App() {

  // const parallax = useParallax({
  //   rotate: [0, 360],
  // });

  return (
      <div className="App">
        <section className="App-header">
       
          <Weather />
        </section>
        <section className="container-body">
          <ParallaxBanner
          layers={[
          { image: 'https://static.dezeen.com/uploads/2022/10/alexander-mcqueen-smiljan-radic-inflatable-dome-spring-summer-2023-fashion_dezeen_2364_col_0-scaled.jpg', speed: -20 },
        ]}
        className="aspect-[2/1]"
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{height: '100vh'}}>
          {/* <h1 className="text-8xl text-white font-thin">Hello World!</h1> */}
        </div>
        </ParallaxBanner>

        <ParallaxBanner
          layers={[
          { image: 'https://images.unsplash.com/photo-1521128688982-60a2f18654d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80', speed: -20 },
        ]}
        className="aspect-[2/1]"
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{height: '200vh'}}>
          
        </div>
        </ParallaxBanner>
        <ParallaxBanner
          layers={[
          { image: 'https://images.unsplash.com/photo-1602934585418-f588bea4215c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80', speed: -20 },
        ]}
        className="aspect-[2/1]"
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{height: '200vh'}}>
          <h1 className="text-8xl text-white font-thin">"Extraordinarily beautiful and infinitely adaptable, the orchid mimics both predator and prey." <br /> -- Sarah Burton</h1>
        </div>
        </ParallaxBanner>
      </section>
      </div>
  );
}

export default App;
