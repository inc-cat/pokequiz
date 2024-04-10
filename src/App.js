import logo from './logo.svg';
import './App.css';
import PokemonEntry from './components/PokemonEntry';
import generation1Data from './data/generation_1.json';
import { useRef, useState } from 'react';

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

  return (
    <div className="App">
      <div className="nameGrid">
        {/* displays all pokemon names from mapped data */}
        {generation1Data.map((pokemon) => (
          // PokeName component imported
          <PokemonEntry
            pokemon={pokemon}
            // if the name has been attempted, the name will be unblurred
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
