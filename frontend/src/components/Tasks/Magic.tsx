import React from 'react'
import coffe from '../../assets/coffe.svg'

interface MagicProps {
  className?: string
  message?: string
}

export default function Magic({ className = '', message = "Magic is happening now, it's time to grab a coffee." }: MagicProps) {
  return (
    <div className={`${className} flex justify-center flex-col items-center text-white`}> 
      <h1 className='text-center text-xl animate-pulse mb-4'>{message}</h1>
      <img src={coffe} alt="coffee" className='h-[220px]' />
    </div>
  )
}
