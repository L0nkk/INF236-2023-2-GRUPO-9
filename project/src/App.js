import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <header>
          <Link to='/Form' onClick={toPage('Form')}></Link>
        </header>
      </BrowserRouter>  
    );
  }
}

export default App;
