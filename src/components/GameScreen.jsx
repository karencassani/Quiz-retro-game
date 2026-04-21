import React, { useState, useEffect } from 'react'

function GameScreen({ myPokeSelection, pcPokeSelection }) {
    // 1. Estados de vida y juego
    const [myHP, setMyHP] = useState(100);
    const [pcHP, setPcHP] = useState(100);
    const [mensaje, setMensaje] = useState("¡Tu turno! Elige un ataque");
    const [esperandoTurno, setEsperandoTurno] = useState(false);

    // Obtenemos los pokemones (asumimos que vienen en el array)
    const mio = myPokeSelection[0];
    const pc = pcPokeSelection[0];

    // 2. Extraer habilidades (los primeros 4 moves)
    const misAtaques = mio?.moves?.slice(0, 4) || [];
    const ataquesPC = pc?.moves?.slice(0, 4) || [];

    // 3. Lógica de Ataque
    const ejecutarAtaque = (nombreAtaque, esMio) => {
        if (myHP <= 0 || pcHP <= 0) return;

        // Calculamos un daño aleatorio entre 10 y 25
        const dano = Math.floor(Math.random() * (25 - 10) + 10);

        if (esMio) {
            const nuevaVidaPC = Math.max(0, pcHP - dano);
            setPcHP(nuevaVidaPC);
            setMensaje(`¡${mio.name} usó ${nombreAtaque.replace('-', ' ')}! (${dano} daño)`);
            
            if (nuevaVidaPC > 0) {
                setEsperandoTurno(true);
                setTimeout(() => contraataquePC(nuevaVidaPC), 1500);
            }
        } else {
            setMyHP(prev => Math.max(0, prev - dano));
            setMensaje(`¡${pc.name} enemigo usó ${nombreAtaque.replace('-', ' ')}! (${dano} daño)`);
            setEsperandoTurno(false);
        }
    };

    const contraataquePC = (currentPcHP) => {
        if (currentPcHP <= 0) return;
        const ataqueRnd = ataquesPC[Math.floor(Math.random() * ataquesPC.length)];
        ejecutarAtaque(ataqueRnd.move.name, false);
    };

    // 4. Revisar si alguien murió
    useEffect(() => {
        if (pcHP === 0) setMensaje(`✨ ¡VICTORIA! ${pc.name} ha caído.`);
        if (myHP === 0) setMensaje(`💀 DERROTA... ${mio.name} no puede continuar.`);
    }, [pcHP, myHP]);

    return (
        <div className="w-[440px] h-[340px] bg-[#E2F0CB] border-x-4 border-white flex flex-col items-center relative overflow-hidden">
            
            {/* Pantalla de Mensajes */}
            <div className="mt-4 z-20 bg-white/90 px-4 py-2 rounded-lg shadow-sm border border-[#8DA47E] w-[80%] text-center">
                <p className="text-[#8DA47E] font-bold text-[10px] uppercase tracking-tighter">{mensaje}</p>
            </div>

            <div className="absolute bottom-24 w-full h-24 bg-[#D1E5B3] rounded-t-[100%]" />

            <div className="z-10 flex w-full items-center justify-around px-8 mt-4">
                {/* MI POKEMON */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mb-2 border border-white overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${myHP > 50 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${myHP}%` }} />
                    </div>
                    <div className="bg-white/60 p-2 rounded-full shadow-sm mb-2">
                        <img src={mio?.sprites?.front_default} alt={mio?.name} className="w-24 h-24" />
                    </div>
                    <p className="bg-[#FF99AA] text-white px-3 py-0.5 rounded-full font-bold capitalize text-[10px] shadow-sm">
                        {mio?.name}
                    </p>
                </div>

                <div className="text-[#8DA47E] font-black text-xl italic opacity-30">VS</div>

                {/* PC POKEMON */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-2 bg-gray-200 rounded-full mb-2 border border-white overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${pcHP > 50 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${pcHP}%` }} />
                    </div>
                    <div className="bg-white/60 p-2 rounded-full shadow-sm mb-2">
                        <img src={pc?.sprites?.front_default} alt={pc?.name} className="w-24 h-24" />
                    </div>
                    <p className="bg-[#C0A0D3] text-white px-3 py-0.5 rounded-full font-bold capitalize text-[10px] shadow-sm">
                        {pc?.name}
                    </p>
                </div>
            </div>

            {/* PANEL DE 4 BOTONES DE ATAQUE */}
            <div className="z-20 grid grid-cols-2 gap-2 w-full px-6 mt-auto mb-4">
                {misAtaques.map((item, index) => (
                    <button
                        key={index}
                        disabled={esperandoTurno || myHP === 0 || pcHP === 0}
                        onClick={() => ejecutarAtaque(item.move.name, true)}
                        className={`py-2 rounded-lg border-2 border-white text-[10px] font-bold uppercase shadow-sm transition-all
                            ${esperandoTurno 
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                                : 'bg-[#C0A0D3] text-white hover:scale-105 active:scale-95'}`}
                    >
                        {item.move.name.replace('-', ' ')}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default GameScreen