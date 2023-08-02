import "./App.css";

function App() {
  return (
    <div className="resume-container">
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 px-5">
        <div className="flex flex-col justify-center text-left lg:ps-20 ps-5 pt-5 md:pt-0">
          <div className=""> Greeting!</div>
          <div className="lg:text-[40px] text-[25px] font-bold">
            I'm Vuttipat Srisumran. <br /> A Full-Stack Developer
          </div>
          <div></div>
        </div>
        <div className="order-first md:order-2 flex justify-center">
          <img
            className="w-[450px] aspect-square object-cover rounded-full"
            src="/Profile-Image.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
