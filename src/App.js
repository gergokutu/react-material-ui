import React, { Component } from 'react';
import './App.css';

import NavBar from './components/Navbar';
import CourseList from './components/CourseList';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <CourseList />
      </div>
    )
  }
}

export default App;
