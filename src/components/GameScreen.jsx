import React, { useState, useEffect } from 'react'

function GameScreen({ myPokeSelection, pcPokeSelection }) {
    // 1. Estados de vida y juego
    const [myHP, setMyHP] = useState(100); //aqui guardamos cuanta vida tiene mi pokemon, empieza en 100
    const [pcHP, setPcHP] = useState(100); //aqui guardamos cuanta vida tiene el pokemon de la compu 
    const [mensaje, setMensaje] = useState("¡Tu turno! Elige un ataque"); //Aqui despliega el mensaje en la pantalla superior
    const [esperandoTurno, setEsperandoTurno] = useState(false); //este es un candado booleano para que no pueda atacar mientras el rival esta pensando 

    // Sacamos el primer pokemon de los arrays 
    const mio = myPokeSelection[0];
    const pc = pcPokeSelection[0];

    // PokeApi trae muchisimos movimientos aqui solo cortamos y agarramos los primeros 4, usamos el signo ? por si la carga falla y que no se rompa
    const misAtaques = mio?.moves?.slice(0, 4) || [];
    const ataquesPC = pc?.moves?.slice(0, 4) || [];

    // Si alguien ya perdio (HP=0)  nadie puede atacar mas 
    const ejecutarAtaque = (nombreAtaque, esMio) => {
        if (myHP <= 0 || pcHP <= 0) return;

        // Calculamos un daño al azar entre 10 y 25 cada vez 
        const dano = Math.floor(Math.random() * (25 - 10) + 10);

        if (esMio) { //Aqui ahora es el turno del  jugador 
            const nuevaVidaPC = Math.max(0, pcHP - dano); //Evita que la vida sea negativa
            setPcHP(nuevaVidaPC);
            setMensaje(`¡${mio.name} usó ${nombreAtaque.replace('-', ' ')}! (${dano} daño)`);
            
            if (nuevaVidaPC > 0) { //si el rival sobrevive, bloqueamos mis botones y espera 1.5 segundos para la respuesta
                setEsperandoTurno(true);
                setTimeout(() => contraataquePC(nuevaVidaPC), 1500);
            }
        } else { //AQui es el turno de la maquina
            setMyHP(prev => Math.max(0, prev - dano));
            setMensaje(`¡${pc.name} enemigo usó ${nombreAtaque.replace('-', ' ')}! (${dano} daño)`);
            setEsperandoTurno(false); //Aqui me devuelve el control a mi 
        }
    };

    const contraataquePC = (currentPcHP) => {
        if (currentPcHP <= 0) return; //la pc elige un ataque al azar de la lista de 4 
        const ataqueRnd = ataquesPC[Math.floor(Math.random() * ataquesPC.length)];
        ejecutarAtaque(ataqueRnd.move.name, false);
    };

    // Este use effect es el que va checando la vida de ambos. En cuanto una llega a 0 el mensaje cambia. 
    useEffect(() => {
        if (pcHP === 0) setMensaje(`✨ ¡VICTORIA! ${pc.name} ha caído.`);
        if (myHP === 0) setMensaje(`💀 DERROTA... ${mio.name} no puede continuar.`);
    }, [pcHP, myHP]);

    return ( 
        /*este es el contenedor principla, aqui definimos el tamaño de la pantalla, el color de fondo verde y oculta lo que sobresalga*/
        <div className="w-[440px] h-[340px] bg-[#E2F0CB] border-x-4 border-white flex flex-col items-center relative overflow-hidden">
            
            {/* Pantalla de Mensajes : el recuardo blanco de arriba nos da lo que esta pasado, como el anrrador  y la siguiente liena muestra la variable 'mensaje' y pone el texto */}
            <div className="mt-4 z-20 bg-white/90 px-4 py-2 rounded-lg shadow-sm border border-[#8DA47E] w-[80%] text-center">
                <p className="text-[#8DA47E] font-bold text-[10px] uppercase tracking-tighter">{mensaje}</p>
            </div>
{/* este es el fondo circulo posicionado al fondo como el piso  */}
            <div className="absolute bottom-24 w-full h-24 bg-[#D1E5B3] rounded-t-[100%]" />

            <div className="z-10 flex w-full items-center justify-around px-8 mt-4">
                {/* aqui arriba es el area de combate es un contenedor horizontal que separa a los dos pokemones, y aca abajo empezaron con mi pokemon que es el de la izquierda */}
                <div className="flex flex-col items-center">
                    {/* Contenedor gris de la barra de vida  y abajo es la barra de vida real: cambia de ancho dependiendo del myHP y cambia de color dependiendo la vida  */}
                    <div className="w-20 h-2 bg-gray-200 rounded-full mb-2 border border-white overflow-hidden">
                        <div className={`h-full transition-all duration-500 ${myHP > 50 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${myHP}%` }} /> {/*Cambia de color esta en verde si es mas de 50 rojo si es*/}
                    </div>
                    {/* Circulo blanco detras del pokemon   */}
                    <div className="bg-white/60 p-2 rounded-full shadow-sm mb-2">
                        {/* imagen del pokemon */}
                        <img src={mio?.sprites?.front_default} alt={mio?.name} className="w-24 h-24" />
                    </div>
                    {/* Aqui etiqueta con el nombre de mi pokemon  , al myHP y es rosa  */}
                    <p className="bg-[#FF99AA] text-white px-3 py-0.5 rounded-full font-bold capitalize text-[10px] shadow-sm">
                        {mio?.name}
                    </p>
                </div>
{/* Este es el texto decoartivo es el vs en el centro */}
                <div className="text-[#8DA47E] font-black text-xl italic opacity-30">VS</div>

                {/* ahora vamos con el de la derecha */}
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

            {/* cuadricula de 2x2 para los ataques*/}
            <div className="z-20 grid grid-cols-2 gap-2 w-full px-6 mt-auto mb-4">
                {misAtaques.map((item, index) => (
                    <button
                        key={index}
                        /* el boton se bloquea si es turno de pc, mori yo o murio la pc*/
                        disabled={esperandoTurno || myHP === 0 || pcHP === 0}
                        /*Al hacer click llama la funcion de ataque pasando el nombre dle poder*/
                        onClick={() => ejecutarAtaque(item.move.name, true)}
                        /*Estilos si esta bloqueado se pone gris y si no morado*/
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