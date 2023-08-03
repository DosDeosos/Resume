import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Brain from "./assets/icons/brain.json";
import Document from "./assets/icons/document.json";
import Clock from "./assets/icons/clock.json";

function App() {
  const [name, setName] = useState("");
  const nameData = ["I'm Vuttipat Srisumran", "A Full-Stack Developer"];
  const [index, setIndex] = useState(0);
  const [namelength, setNamelength] = useState(0);
  const aboutMe = [
    {
      Icon: "https://lottie.host/4f708088-23f1-4c37-841f-7bd8069102dd/TzveQ5Lfd3.json",
      text: "Able to work anywhere, anytime.",
    },
    {
      Icon: "https://lottie.host/a95ec2eb-828c-4bee-a8e7-1cdc1cae3a72/ogTfJGs12I.json",
      text: "A lot of passion towards coding, Mainly modifications of my own projects.",
    },
    {
      Icon: "https://lottie.host/d648cc21-a59a-480f-b57d-5f8d3db218d6/tBBkPfu1tu.json",
      text: "Self-Learning and the ability to learn quickly from the surrounding environment.",
    },
    {
      Icon: Brain,
      text: "Open-minded <br/> and able to work with everyone.",
    },
    {
      Icon: Document,
      text: "Ability to read documents <br/> and apply them to projects.",
    },
    {
      Icon: Clock,
      text: "Ability to work in shift <br/> or disordered time.",
    },
  ];

  const setNameFunction = () => {
    const nametouse = nameData[index];
    const character = nametouse.charAt(namelength);
    setName(name + character);
    setNamelength(namelength + 1);
    if (namelength === nametouse.length) {
      setTimeout(() => {
        setName("");
        setIndex(index === 1 ? 0 : 1);
        setNamelength(0);
      }, 2000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setNameFunction();
    }, 50);
  }, [name]);

  return (
    <div className="resume-container">
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 px-5">
        <div className="flex flex-col justify-center text-left lg:ps-20 ps-2 pt-5 md:pt-0 text-blue-900">
          <div className="text-[20px]"> Greeting!</div>
          <div className="lg:text-[40px] text-[25px] font-bold">
            {name}&nbsp;
          </div>
          <div className="text-[16px] lg:text-[20px] text-cyan-950">
            A Full-Stack Developer with passion!, <br /> I strive to be a better
            version of myself.
            <br /> Aviation turns Programmer!
          </div>
          <div className="mt-6">
            <div className=" flex">
              <a href="mailto:dosdeosos@gmail.com">
                <div className="bg-gray-200 rounded-full p-2">
                  <Player
                    src="https://lottie.host/098511ec-58fe-4b8e-9ab9-ce96a65c041e/W8X2phGgHX.json"
                    className="lg:w-[60px] lg:h-[60px] w-[50px] h-[50px]"
                    autoplay
                    loop
                  />
                </div>
              </a>
              <a href="tel:+66818570121" className="ms-3">
                <div className="bg-gray-200 rounded-full p-2">
                  <Player
                    src="https://lottie.host/a696deaf-c21b-4109-9255-3b8d585de83a/yef7uzEf1L.json"
                    className="lg:w-[60px] lg:h-[60px] w-[50px] h-[50px]"
                    autoplay
                    loop
                  />
                </div>
              </a>
              <a
                href="https://line.me/ti/p/~dosdeosos"
                target="_blank"
                className="ms-3"
              >
                <div className="bg-gray-200 rounded-full p-[17.5px]">
                  <Player
                    src="https://lottie.host/c236fae1-fa1c-4a9f-bdf2-a8bcef842927/zYbGcU3orP.json"
                    className="lg:w-[40px] lg:h-[40px] w-[30px] h-[30px]"
                    autoplay
                    loop
                  />
                </div>
              </a>
              <a
                href="https://github.com/DosDeosos"
                target="_blank"
                className="ms-3"
              >
                <div className="bg-gray-200 rounded-full p-2">
                  <Player
                    src="https://lottie.host/e07c432c-9a65-442a-8eea-bddaa3abf772/r5XY5XiY4a.json"
                    className="lg:w-[60px] lg:h-[60px] w-[50px] h-[50px]"
                    autoplay
                    loop
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="order-first md:order-2 flex justify-center">
          <img
            className="w-[450px] aspect-square object-cover rounded-full"
            src="/Profile-Image.jpg"
          />
        </div>
      </div>
      <div className="lg:text-[40px] md:text-[30px] text-[25px] text-blue-900 font-semi-bold">
        About Me
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5 mt-4">
        {aboutMe.map((data, index) => {
          return (
            <div key={index} className="Card-About-Me">
              <Player
                src={data.Icon}
                className="md:w-[80px] md:h-[80px] w-[50px] h-[50px]"
                autoplay
                loop
              />
              <span dangerouslySetInnerHTML={{ __html: data.text }}></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
