import './App.css';
import PokemonEntry from './components/PokemonEntry';
import generation1Data from './data/generation_1.json';
import generation2Data from './data/generation_2.json';
import generation3Data from './data/generation_3.json';
import generation4Data from './data/generation_4.json';
import generation5Data from './data/generation_5.json';
import generation6Data from './data/generation_6.json';
import generation7Data from './data/generation_7.json';
import generation8Data from './data/generation_8.json';
import generation9Data from './data/generation_9.json';
import { useEffect, useRef, useState } from 'react';

function App() {
  // attempts array is populated when user submits names through form
  const [attempts, setAttempts] = useState([]);
  // allows you to read the input form
  const inputRef = useRef();
  function onSubmit(event) {
    // disable default handling
    event.preventDefault();
    // read the input name from form
    const name = inputRef.current.value;
    // add name to list of attempts
    setAttempts((attempts) => [...attempts, name]);
    // clear input box
    inputRef.current.value = '';
  }
  const [options, setOptions] = useState('');
  const [gen, setGen] = useState('');
  const optionsRef = useRef();
  const genRef = useRef();
  function onSubmit2(event) {
    // disable default handling
    event.preventDefault();
    // read the input name from form
    const diff = optionsRef.current.value;
    setOptions(diff);
    const gen = genRef.current.value;
    setGen(gen);
  }

  // hash map for choosing which data source to use
  const generationObject = {
    1: generation1Data,
    2: generation2Data,
    3: generation3Data,
    4: generation4Data,
    5: generation5Data,
    6: generation6Data,
    7: generation7Data,
    8: generation8Data,
    9: generation9Data,
  };

  // when generation number is selected, will use data from speicified generation number or generation 1 by default
  let userGenerationSelection = generationObject[gen] ?? generation1Data;

  // disables right clock
  useEffect(function () {
    document.addEventListener('contextmenu', handleContextMenu);
    return function () {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const handleContextMenu = function (event) {
    event.preventDefault();
    console.log('Click disabled!');
  };

  return (
    <div className="App">
      {/* options for user game mode (generation and difficulty) */}
      <form onSubmit={onSubmit2}>
        <label for="option">Generation: </label>
        {/* unique reference for onsubmit further down */}
        <select name="generation" id="generation" ref={genRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        <label for="option">Difficulty: </label>
        {/* unique reference for onsubmit further down */}
        <select name="difficulty" id="difficulty" ref={optionsRef}>
          <option value="1">Easy</option>
          <option value="2">Medium</option>
          <option value="3">Hard</option>
        </select>
        <input type="submit" value="Choose!"></input>
      </form>
      <div className="nameGrid">
        {/* displays all pokemon names from mapped data */}
        {userGenerationSelection.map((pokemon) => (
          // PokeName component imported
          <PokemonEntry
            pokemon={pokemon}
            gen={gen}
            difficulty={options}
            isBlurred={!attempts.includes(pokemon.name)}
          ></PokemonEntry>
        ))}
      </div>
      <div>
        {/* for the form the user types their attempts into */}
        <form onSubmit={onSubmit}>
          {/* text is read by inputRef to be used in the onSubmit */}
          <input type="text" ref={inputRef} placeholder="guess" />
          <input class="styled" type="submit" value="Submit?" />
        </form>
      </div>
    </div>
  );
}

export default App;
