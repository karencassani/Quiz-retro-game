import React from 'react'

function RightControl({handleSelection}) {
  return (
    <div className="relative w-[100px] h-[240px] border-4 rounded-r-3xl border-solid bg-pink-300">

        <div className="absolute -top-4 left-1 w-20 h-4 bg-pink-200 rounded-t-xl"></div>

        <button className="absolute top-0 right-17 w-5 h-5 text-gray-500 text-2xl bg-transparent">+</button>

        <div className="absolute top-7 absolute left-1.5 relative w-20 h-20">

            <button className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-pink-500 text-xs">X</button>

            <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-pink-500 text-xs">B</button>

            <button className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-pink-500 text-xs">Y</button>

            <button 
            onClick={handleSelection} 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-pink-500 text-xs">A</button>
        </div>

        <div className="absolute top-9 absolute left-6 relative w-20 h-20">

            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-500 text-xs"></div>

        </div>

        <div className="absolute left-2 top-49 -translate-y-1/2 w-5 h-5 bg-white rounded-full flex items-center justify-center text-pink-500 text-xs border-pink-300 border border-gray-400"></div>

    </div>
  )
}

export default RightControl