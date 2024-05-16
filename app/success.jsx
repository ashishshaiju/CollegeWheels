import React from 'react'
import Image from 'next/image';
import img from '@/assets/Verified.gif';
const SuccessImage = () => {
  return (
    <div className='flex flex-col justify-between w-full items-center'>
      <Image src={img} className='w-full' />
      <h1>Verified Successfully!</h1>
    </div>
  )
}

export default SuccessImage;
