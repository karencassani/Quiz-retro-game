import React, { useState } from 'react'

function GameScreen({ myPokeSelection, pcPokeSelection }) {
    const [myHP, setMyHP] = useState(100);
    const [pcHP, setPcHP] = useState(100);

    return (
        <div className="w-[440px] h-[300px] bg-emerald-700 border-x-4 border-emerald-900 flex items-center justify-center relative overflow-hidden shadow-inner">
            
            <div className="absolute bottom-0 w-[120%] h-32 bg-emerald-500 rounded-t-[100%] left-[-10%] shadow-lg" />

            <div className="z-10 flex w-full items-center justify-around px-8">
                
                <div className="flex flex-col items-center">
                    {myPokeSelection?.map((pokemon, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <p className="text-[10px] font-bold text-white mb-1 drop-shadow-sm">
                                HP: {myHP}/100
                            </p>
                            <div className="bg-white/40 p-2 rounded-full shadow-lg mb-2 drop-shadow-lg">
                                <img
                                    src={pokemon?.sprites?.front_default}
                                    alt={pokemon.name}
                                    className="w-28 h-28"
                                />
                            </div>
                            <p className="bg-[#FF99AA] text-white px-4 py-1 rounded-full font-bold capitalize text-sm shadow-md">
                                {pokemon.name}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-emerald-100 font-black text-3xl italic opacity-40 drop-shadow-sm">
                    vs
                </div>

                <div className="flex flex-col items-center">
                    {pcPokeSelection?.map((pokemon, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <p className="text-[10px] font-bold text-white mb-1 drop-shadow-sm">
                                HP: {pcHP}/100
                            </p>
                            <div className="bg-white/40 p-2 rounded-full shadow-lg mb-2 drop-shadow-lg">
                                <img
                                    src={pokemon?.sprites?.front_default}
                                    alt={pokemon.name}
                                    className="w-28 h-28"
                                />
                            </div>
                            <p className="bg-[#C0A0D3] text-white px-4 py-1 rounded-full font-bold capitalize text-sm shadow-md">
                                {pokemon.name}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default GameScreen