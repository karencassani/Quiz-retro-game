import React, { useState, useEffect } from 'react'

function GameScreen({ myPokeSelection, pcPokeSelection }) {
    // 1. Estados de salud (HP)
    const [myHP, setMyHP] = useState(100);
    const [pcHP, setPcHP] = useState(100);
    const [mensaje, setMensaje] = useState("¡A pelear!");

    // 2. Función para atacar (Tu turno)
    const handleAttack = () => {
        if (pcHP <= 0 || myHP <= 0) return; // Si alguien ya perdió, no atacar

        // Daño aleatorio entre 10 y 25
        const damage = Math.floor(Math.random() * 15) + 10;
        const newPcHP = Math.max(0, pcHP - damage);
        setPcHP(newPcHP);
        setMensaje(`¡Atacaste! Hiciste ${damage} de daño`);

        // Si la PC sigue viva, ella contraataca después de 1 segundo
        if (newPcHP > 0) {
            setTimeout(() => {
                const pcDamage = Math.floor(Math.random() * 15) + 10;
                setMyHP(prev => Math.max(0, prev - pcDamage));
                setMensaje(`¡PC contraataca! Recibiste ${pcDamage} de daño`);
            }, 1000);
        }
    };

    // 3. Revisar quién ganó
    useEffect(() => {
        if (pcHP === 0) setMensaje("¡GANASTE LA BATALLA! 🎉");
        if (myHP === 0) setMensaje("¡PERDISTE! El Pokémon se debilitó... 💀");
    }, [pcHP, myHP]);

    return (
        <div className="w-[440px] h-[300px] bg-[#E2F0CB] border-x-4 border-white flex flex-col items-center justify-center relative overflow-hidden">
            
            {/* Mensaje de batalla arriba */}
            <div className="absolute top-4 z-20 bg-white/80 px-4 py-1 rounded-full shadow-sm">
                <p className="text-[#8DA47E] font-bold text-xs uppercase tracking-widest">{mensaje}</p>
            </div>

            <div className="absolute bottom-0 w-full h-24 bg-[#D1E5B3] rounded-t-[100%]" />

            <div className="z-10 flex w-full items-center justify-around px-8">
                
                {/* TU POKEMON */}
                <div className="flex flex-col items-center">
                    {myPokeSelection?.map((pokemon, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Barra de vida visual */}
                            <div className="w-24 h-2 bg-gray-200 rounded-full mb-2 overflow-hidden border border-white">
                                <div 
                                    className={`h-full transition-all duration-500 ${myHP > 50 ? 'bg-green-400' : myHP > 20 ? 'bg-yellow-400' : 'bg-red-400'}`}
                                    style={{ width: `${myHP}%` }}
                                />
                            </div>

                            {/* Al hacer clic en la imagen, ATACAS */}
                            <div 
                                onClick={handleAttack}
                                className={`bg-white/60 p-2 rounded-full shadow-sm mb-2 cursor-pointer hover:scale-110 active:scale-95 transition-transform ${myHP === 0 ? 'grayscale opacity-50' : ''}`}
                            >
                                <img
                                    src={pokemon?.sprites?.front_default}
                                    alt={pokemon.name}
                                    className="w-28 h-28"
                                />
                            </div>
                            <p className="bg-[#FF99AA] text-white px-4 py-1 rounded-full font-bold capitalize text-sm shadow-sm">
                                {pokemon.name} (HP: {myHP})
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-[#8DA47E] font-medium text-xl italic opacity-60">
                    vs
                </div>

                {/* PC POKEMON */}
                <div className="flex flex-col items-center">
                    {pcPokeSelection?.map((pokemon, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Barra de vida visual PC */}
                            <div className="w-24 h-2 bg-gray-200 rounded-full mb-2 overflow-hidden border border-white">
                                <div 
                                    className={`h-full transition-all duration-500 ${pcHP > 50 ? 'bg-green-400' : pcHP > 20 ? 'bg-yellow-400' : 'bg-red-400'}`}
                                    style={{ width: `${pcHP}%` }}
                                />
                            </div>

                            <div className={`bg-white/60 p-2 rounded-full shadow-sm mb-2 transition-opacity ${pcHP === 0 ? 'grayscale opacity-50' : ''}`}>
                                <img
                                    src={pokemon?.sprites?.front_default}
                                    alt={pokemon.name}
                                    className="w-28 h-28"
                                />
                            </div>
                            <p className="bg-[#C0A0D3] text-white px-4 py-1 rounded-full font-bold capitalize text-sm shadow-sm">
                                {pokemon.name} (HP: {pcHP})
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default GameScreen