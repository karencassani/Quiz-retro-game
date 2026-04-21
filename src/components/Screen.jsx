import React from 'react';

const Screen = ({ pokemones, position }) => {
  return (
    /* Cambié el borde a blanco y el fondo a un verde oscuro que combine con tu GameScreen */
    <div className="w-[450px] h-[300px] overflow-y-auto border-4 border-white bg-[#2C3E50] rounded-lg custom-scrollbar">
      <div className="flex flex-wrap items-center justify-center p-2 gap-2">
        {pokemones?.map((pokemon, index) => {
          // Detectamos si es el pokemon actual
          const isSelected = position === pokemon.id;

          return (
            <div 
              key={index}
              /* Si está seleccionado, usamos tu verde pastel #E2F0CB y lo resaltamos */
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 border-2
                ${isSelected 
                  ? "bg-[#E2F0CB] border-white scale-105 shadow-md" 
                  : "bg-white/5 border-transparent opacity-60"}`}
            >
              {/*Imagen del pokemon, muestra el sprite frontal */}
              <img
                src={pokemon?.sprites?.front_default}
                alt={pokemon.name}
                className="w-20 h-20"
              />
              {/*Nombre del pokemon, si esta seleccionado sael en verde oscuro y si no el texto sale en blanco*/}
              <p className={`text-[10px] font-bold capitalize 
                ${isSelected ? "text-[#8DA47E]" : "text-white"}`}>
                {pokemon.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Screen;