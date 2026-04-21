import './App.css';
import Screen from './components/Screen';
import GameScreen from './components/GameScreen';
import LeftControl from './components/LeftControl';
import RightControl from './components/RightControl';
import PokemonDetails from './components/PokemonDetails'; 
import useFetch from './hooks/useFetch';
import { useEffect, useState } from 'react';

function App() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0';
  const { data, loading, error } = useFetch(url);

  const [pokemones, setPokemones] = useState([]);
  const getListPokemones = () => {
    const list = data?.results?.filter((p) => p.url);
    const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));
    Promise.all(plist).then((values) => {
      setPokemones(values);
    });
  };

  useEffect(() => {
    getListPokemones();
  }, [data]);

  const [position, setPosition] = useState(1);
  const [myPokeSelection, setMyPokeSelection] = useState([]);
  const [pcPokeSelection, setPcPokeSelection] = useState([]);

  const handleDirection = (direction) => {
    if (direction === 'right' && position + 1 < 101) {
      setPosition((prev) => prev + 1);
    } else if(direction === 'left' && position - 1 > 0){
      setPosition((prev) => prev - 1);
    } else if(direction === 'down' && position + 4 < 101){
      setPosition((prev) => prev + 4);
    }else if(direction === 'up' && position - 4 > 0){
      setPosition((prev) => prev - 4);
    }else{
      setPosition(1);
    }
  };

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
  }

  const computerSelection = () => {
    const rnd = getRandomInt(1, 100);
    const pc = pokemones.filter((p) => p.id === rnd);
    setPcPokeSelection(pc);
  }

  const handleSelection = () => {
    const selectPokemon = pokemones.filter((p) => p.id === position)
    setMyPokeSelection(selectPokemon);
    computerSelection();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="flex items-center justify-center">
        <LeftControl handleDirection={handleDirection} />
        
        {myPokeSelection.length > 0 && pcPokeSelection.length > 0 ? (
          <GameScreen myPokeSelection={myPokeSelection} pcPokeSelection={pcPokeSelection}/>
        ) : (
          <Screen pokemones={pokemones} position={position} />
        )}

        {/* PASAMOS LAS FUNCIONES DE ESTADO AQUÍ PARA EL BOTÓN DE RESET */}
        <RightControl 
          handleSelection={handleSelection} 
          setMyPokeSelection={setMyPokeSelection} 
          setPcPokeSelection={setPcPokeSelection} 
        />
      </div>

      {!(myPokeSelection.length > 0 && pcPokeSelection.length > 0) && (
        <PokemonDetails pokemones={pokemones} position={position} />
      )}
    </div>
  ); 
} 

export default App;