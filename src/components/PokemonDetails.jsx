import React from 'react'
 
 function PokemonDetails({ pokemones, position }) {

    const pokemonEnMira = pokemones.find(p => p.id === position); //Este es el parametro que trae toda la info de la api 

  if (!pokemonEnMira) return null; //Si no hay un pokemon cargado pusimos null para que no dibuje nada y no haya errores 

   return (
    <div className="mt-8 bg-white p-5 border border-black font-mono w-[420px]"> {/* Blanco sólido, borde negro simple y esquinas normales */}
      <div className="flex justify-between items-center mb-3">{/* Aqui la fila contiene le ID y el nombre del pokemon*/}
        <span className="text-xs font-bold text-black">{/* Esta es la etiqueta del id, sin fondos ni bordes de colores */}
          ID: #{pokemonEnMira.id}
        </span>
        <h2 className="text-xl font-bold text-black capitalize">{/* Aqui es el nombre del pokemon, tamaño letra y color basico */}
          {pokemonEnMira.name}
        </h2>
      </div>
      
      <div className="flex justify-center p-2 mb-4 bg-white border-b border-black">{/* Aqui se puso el fondo blanco  */}
        <img src={pokemonEnMira.sprites?.front_default} className="w-32 h-32" alt="preview" />{/* la imagen aqui se selecciono ancho alto y se quito la sombra */}
      </div>

      <div className="bg-white p-3 max-h-[120px] overflow-y-auto">{/* este es el contenedor de los ataques tiene de maximo 120 y activa el scroll si se pasa  */}
        <p className="text-[11px] font-bold text-black mb-2 uppercase">Movimientos y Poder:</p> {/* titulo de la seccion y tamaño */}
        <ul className="grid grid-cols-2 gap-2">{/* 2 filas 2 columnas y en la linea de abajo esta el 4 porque queremos maximo 4 poderes si queresmo mas entonces ps si*/}
          {pokemonEnMira.moves?.slice(0, 4).map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b border-gray-300"> {/* Solo una linea gris abajo para separa */}
              <span className="text-[9px] text-black capitalize">{item.move?.name}</span>{/* aqui ponemos de negro el nombre del ataque que viene de la api  */}
              {/* Aqui genere el numero random entre 40 y 100, se calcula un numeor al azar multiplicamos por un num .60 y le sumamos 40 para que el numero sea mayor a 40*/}
              <span className="text-[10px] font-bold text-black">
                {Math.floor(Math.random() * (100 - 40) + 40)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
   )
 }

 export default PokemonDetails;