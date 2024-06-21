import Hero from "./components/Hero";

import Toggle from "./components/Toggle";


import "./App.css";

const App = () => {
  return (
    <main className="no-scrollbar">
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Hero />
        <Toggle />
      </div>
    </main>
  );
};

export default App;
