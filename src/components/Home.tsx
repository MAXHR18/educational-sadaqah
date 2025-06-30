
import { useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="wrapper">
      <div className="content" role="main">
        <h1 className="title">Hello World!</h1>
        <img
          src="https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2Fillustration.svg?v=1618177344016"
          className="illustration"
          alt="Editor illustration"
          title="Click the image!"
          onClick={() => setClicked(!clicked)}
        />
        
        <div className="instructions">
          <h2>Using this project</h2>
          <p>
            This is the Glitch <strong>Hello Website</strong> project. You can
            use it to build your own site. Check out README.md in the editor for
            more info and next steps you can take!
          </p>
          
          <button 
            className={clicked ? 'dipped' : ''}
            onClick={handleButtonClick}
          >
            Click me!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
