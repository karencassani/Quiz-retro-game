import React from 'react'

function LeftControl({handleDirection}) {
  return (
    <div className=" relative w-[100px] h-[240px] border-4 rounded-l-3xl border-solid bg-cyan-200 ">

      <div className="absolute -top-4 left-2 w-20 h-4 bg-cyan-100 rounded-t-xl"></div>

        <button className="absolute top-0 right-1 w-5 h-5 text-gray-500 text-2xl bg-transparent">-</button>

        <div className="absolute top-12 absolute left-6 relative w-20 h-20">

          <div className="absolute left-0 top-1/9 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center text-cyan-500 text-xs"></div>

        </div>

          <div className="absolute top-5 absolute left-1.5 relative w-20 h-20">

            <button 
            onClick={() => handleDirection('top')} 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-cyan-500 text-xs">{'^'}</button>


            <button 
            onClick={() => handleDirection('down')} 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-cyan-500 text-xs">{'v'}</button>


            <button 
            onClick={() => handleDirection('left')} 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-cyan-500 text-xs">{'<'}</button>


            <button 

               onClick={() => handleDirection('right')} 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-cyan-500 text-xs">{'>'}</button>
        </div>

          <div className="absolute right-2 top-49 -translate-y-1/2 w-4 h-4 bg-white flex items-center justify-center text-cyan-500 text-xs"></div>
    </div>
  )
}

export default LeftControl