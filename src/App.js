import logo from './logo.svg';
import './App.css';
import PokemonName from './components/PokemonName';
import pokemonNames from './data/pokemon_names.json';

function App() {
  return (
    <div className="App">
      <div className="nameGrid">
        {pokemonNames.map((name) => (
          <PokemonName name={name}></PokemonName>
        ))}
      </div>
    </div>
  );
}

export default App;
