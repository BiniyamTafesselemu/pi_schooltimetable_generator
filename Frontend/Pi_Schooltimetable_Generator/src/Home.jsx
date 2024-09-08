import { Button } from "flowbite-react";
import Img from "./components/Img";
import imageSource from "./assets/Background.png"
import illustration from './assets/Teaching-pana (1).svg'
import logo from './assets/pi-school-system-logo-only.png'

const Home = () => {
  //<a href="https://storyset.com/education">Education illustrations by Storyset</a>
  return (
    <div className="bg-[#F1F1F1] h-screen overflow-y-auto overflow-x-hidden">
    <header class="relative z-10 flex flex-row items-center justify-between px-5 m-0">
      <div className="flex flex-row items-center justify-center gap-1">
        <img class="w-[60px] h-auto" src={logo} />
        <h1 class="text-[#5e469c] text-[45px] font-bold font-['Inter']">
          Pi Timetable Generation System
        </h1>
      </div>
      <button class="p-2 px-4 bg-[#5e469c] hover:bg-black rounded-lg text-neutral-100 text-xl font-normal font-['Inter']">
          SIGN IN
      </button>
    </header>
      <div id="hero" className="relative flex justify-center items-center">
        {/* Background Image */}
        <img
          src= {imageSource}
          alt="background image"
          className="absolute top-[-25%] bottom-0 right-[-6%] w-[50%] object-contain z-0"
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-row justify-between items-center rounded-lg gap-10">
          <div id="hero-text" className="">
            <div class="text-[#5e469c] text-[40px] font-bold font-['Inter']">
              Revolutionize Your School's Scheduling
            </div>
            <p id="hero-explanation" className="text-black text-3xl font-normal font-['Inter']">
              Effortlessly create and manage class schedules for multiple schools.
            </p>
            <button className="px-4 bg-[#5e469c] hover:bg-black rounded-lg border border-[#8b5eff] text-neutral-100 text-[32px] font-normal font-['Inter']">
              Start Now!
            </button>
          </div>
          <img src={illustration} alt="illustration" className="w-[50%] h-auto" />
        </div>
      </div>
      <div id="Benefits" className="flex flex-row">

      </div>
    </div>
  );
};

export default Home;
