import React, { useState, useEffect } from 'react'

function GameScreen({ myPokeSelection, pcPokeSelection }) {
    // 1. Estados de salud (HP)
    const [myHP, setMyHP] = useState(100);
    const [pcHP, setPcHP] = useState(100);
    const [mensaje, setMensaje] = useState("¡A pelear!");
    const [turnoActivo, setTurnoActivo] = useState(true); // Para que no puedas spamear clics

    // 2. Extraer el poder de ataque de los stats del Pokémon (usualmente el stat[1] es attack)
    const myAttackPower = myPokeSelection[0]?.stats[1]?.base_stat || 50;
    const pcAttackPower = pcPokeSelection[0]?.stats[1]?.base_stat || 50;

    // 3. Función para atacar
    const handleAttack = () => {
        if (pcHP <= 0 || myHP <= 0 || !turnoActivo) return;

        setTurnoActivo(false); // Bloqueamos el clic mientras sucede la animación

        // CALCULAMOS DAÑO BASADO EN EL ATAQUE:
        // El daño será (Poder de ataque / 5) + un poquito de suerte (random)
        const damage = Math.floor((myAttackPower / 5) + Math.random() * 10);
        const newPcHP = Math.max(0, pcHP - damage);
        
        setPcHP(newPcHP);
        setMensaje(`¡${myPokeSelection[0].name} usó su poder (${myAttackPower}) e hizo ${damage} de daño!`);

        if (newPcHP > 0) {
            setTimeout(() => {
                // Contraataque de la PC basado en SU fuerza
                const pcDamage = Math.floor((pcAttackPower / 5) + Math.random() * 10);
                setMyHP(prev => Math.max(0, prev - pcDamage));
                setMensaje(`¡La PC contraataca con ${pcAttackPower} de fuerza e hizo ${pcDamage} de daño!`);
                setTurnoActivo(true); // Te devuelve el turno
            }, 1000);
        }
    };

    // 4. Revisar victoria
    useEffect(() => {
        if (pcHP === 0) setMensaje(`🏆 ¡GANASTE! ${myPokeSelection[0].name} es superior.`);
        if (myHP === 0) setMensaje("💀 PERDISTE. La PC tiene un Pokémon más fuerte...");
    }, [pcHP, myHP]);

    return (
        <div className="w-[440px] h-[300px] bg-[#E2F0CB] border-x-4 border-white flex flex-col items-center justify-center relative overflow-hidden">
            
            <div className="absolute top-4 z-20 bg-white/90 px-4 py-2 rounded-lg shadow-sm border border-[#8DA47E]">
                <p className="text-[#8DA47E] font-bold text-[10px] uppercase text-center">{mensaje}</p>
            </div>

            <div className="absolute bottom-0 w-full h-24 bg-[#D1E5B3] rounded-t-[100%]" />

            <div className="z-10 flex w-full items-center justify-around px-8">
                
                {/* TU POKEMON */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full mb-2 border border-white">
                        <div 
                            className={`h-full transition-all duration-500 ${myHP > 50 ? 'bg-green-400' : 'bg-red-400'}`}
                            style={{ width: `${myHP}%` }}
                        />
                    </div>
                    <div 
                        onClick={handleAttack}
                        className={`bg-white/60 p-2 rounded-full shadow-sm mb-2 cursor-pointer transition-all ${turnoActivo ? 'hover:scale-110 active:bg-white' : 'opacity-80'}`}
                    >
                        <img src={myPokeSelection[0]?.sprites?.front_default} className="w-24 h-24" alt="mio" />
                    </div>
                    <p className="bg-[#FF99AA] text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase shadow-sm">
                        ATK: {myAttackPower}
                    </p>
                </div>

                <div className="text-[#8DA47E] font-black text-2xl italic opacity-30">VS</div>

                {/* PC POKEMON */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full mb-2 border border-white">
                        <div 
                            className={`h-full transition-all duration-500 ${pcHP > 50 ? 'bg-green-400' : 'bg-red-400'}`}
                            style={{ width: `${pcHP}%` }}
                        />
                    </div>
                    <div className="bg-white/60 p-2 rounded-full shadow-sm mb-2">
                        <img src={pcPokeSelection[0]?.sprites?.front_default} className="w-24 h-24" alt="pc" />
                    </div>
                    <p className="bg-[#C0A0D3] text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase shadow-sm">
                        ATK: {pcAttackPower}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default GameScreen;