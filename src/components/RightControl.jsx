import React from 'react'

/* Añadimos setMyPokeSelection y setPcPokeSelection para poder reiniciar el juego */
function RightControl({ handleSelection, setMyPokeSelection, setPcPokeSelection }) {
    
    // Función para resetear la batalla y volver a la lista
    const handleReset = () => {
        setMyPokeSelection([]);
        setPcPokeSelection([]);
    };

    return (
        <div className="w-[100px] h-[280px] border-4 border-white shadow-lg relative bg-[#D4BEE4] rounded-r-[3rem] flex flex-col items-center">
            <div className="absolute -top-4 right-4 w-20 h-5 bg-[#C0A0D3] rounded-t-2xl border-x-4 border-t-4 border-white"></div>

            <div className="absolute top-6 left-3 w-6 h-6 flex items-center justify-center bg-[#C0A0D3] rounded-full text-white font-bold shadow-sm cursor-pointer hover:scale-110 transition-transform text-xl">
                +
            </div>

            <div className="mt-12 w-20 h-20 relative">
                <button 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-7 h-7 bg-[#AEE2FF] border-2 border-white rounded-full flex items-center justify-center shadow-md hover:brightness-90 active:scale-90 transition-all text-white font-extrabold text-xs"
                >
                    X
                </button>

                {/* Usamos el botón B (el rojo) para RESETEAR el juego */}
                <button 
                    onClick={handleReset}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-7 bg-[#FFABAB] border-2 border-white rounded-full flex items-center justify-center shadow-md hover:brightness-90 active:scale-90 transition-all text-white font-extrabold text-xs"
                >
                    B
                </button>

                <button 
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#C1E1C1] border-2 border-white rounded-full flex items-center justify-center shadow-md hover:brightness-90 active:scale-90 transition-all text-white font-extrabold text-xs"
                >
                    Y
                </button>

                {/* El botón A sigue siendo para SELECCIONAR e iniciar pelea */}
                <button 
                    onClick={handleSelection} 
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#FFF5BA] border-2 border-white rounded-full flex items-center justify-center shadow-md hover:brightness-90 active:scale-90 transition-all text-white font-extrabold text-xs"
                >
                    A
                </button>
            </div>

            <div className="mt-10 w-16 h-16 bg-[#FDFDFF] rounded-full shadow-inner border-4 border-[#C0A0D3] flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full shadow-md border-2 border-gray-100"></div>
            </div>

            <div className="absolute bottom-8 w-7 h-7 bg-[#C0A0D3] rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <div className="w-3 h-3 border-2 border-white rounded-full"></div>
            </div>
        </div>
    )
}

export default RightControl