import React from 'react';
import './App.css'; // Assuming you have a CSS file for styling
import profilePicture from './assets/profilePicture.jpg'; // Assuming you have an image file

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Miguel Mascaró</h1>
        <img src={profilePicture} alt="Miguel Mascaró" className="profilePicture"/> {/* Add this line */}
        <p>Software Developer | Web Designer | Tech Enthusiast</p>
      </header>
      <section className="about">
        <h2>About Me</h2>
        <p>I'm a passionate software developer with a love for building elegant and efficient web applications. I've been tinkering with computers since before I could spell my name. Over the years, I've honed my skills in various programming languages and frameworks, allowing me to create innovative solutions to complex problems. My journey began creating simple mincraft mods in Java and has since evolved to mastering C++, C, Python, JavaScript, React, Node.js, and more. I thrive in collaborative environments and enjoy the challenge of staying current with the latest industry trends and technologies. Whether it's front-end design or back-end logic, I am dedicated to delivering high-quality, user-centric applications.</p>

      </section>
      <section className="projects">
        <h2>Projects</h2>
        <div className="project">
          <h3>Project 1</h3>
          <p>Description of Project 1...</p>
        </div>
        <div className="project">
          <h3>Project 2</h3>
          <p>Description of Project 2...</p>
        </div>
        // Add more projects as needed
      </section>
      <section className="contact">
        <h2>Contact</h2>
        <p>Feel free to reach out to me via email at <a href="mailto:mmascaro101@gmail.com">mmascaro101@gmail.com</a>.</p>
      </section>
    </div>
  );
}

export default App;