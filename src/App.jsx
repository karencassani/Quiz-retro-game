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
/*Estados para los datos compleots */
  const [pokemones, setPokemones] = useState([]);
  const getListPokemones = () => {
    /*esta funcion va y descarga los detalles, fotos ataques */
    const list = data?.results?.filter((p) => p.url);
   /*creamos una lista de peticiones fetch*/
    const plist = list?.map((l) => fetch(l.url).then((res) => res.json()));
    Promise.all(plist).then((values) => {
      setPokemones(values);
    });
  };
/*Se ejecuta cuando la data del primer fetch cambia */
  useEffect(() => {
    getListPokemones();
  }, [data]);

  const [position, setPosition] = useState(1); //El ID del pokemon resaltado en la lista 
  const [myPokeSelection, setMyPokeSelection] = useState([]); //Mi pokemon elegido 
  const [pcPokeSelection, setPcPokeSelection] = useState([]); //El pokemon que elige la maquina 
  /*La logica de movimientos, controlamos los limites para no salirnos del catalogo */
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
//Genera un numero al azar para que la computadora elija su pokemon 
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
//Cuando presionas el boton a en right control 
  const handleSelection = () => {
    const selectPokemon = pokemones.filter((p) => p.id === position)
    setMyPokeSelection(selectPokemon); //Guarda mi eleccion 
    computerSelection(); //Me da la eleccion de la PC
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