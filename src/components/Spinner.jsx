import React from 'react'

const Spinner = () => {
  return (
    /* From Uiverse.io by ArnavK-09 */ 
<div
  className="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-4 md:h-4 h-8 w-8 aspect-square rounded-full"
>
  <div
    className="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
  ></div>
</div>

  )
}

export default Spinner