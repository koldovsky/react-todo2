import React from 'react';
import { render } from 'react-dom';
import Todo from './Todo';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center',
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Todo />
      </div>
    );
  }
}

export default App;

render(<App />, document.getElementById('root'));
