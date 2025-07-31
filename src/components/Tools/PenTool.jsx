import React from 'react'
import ColorPicker from './ColorPicker';
import { useState } from 'react';
import SizeSlider from './SizeSlider';
const PenTool = ({onclose}) => {
    const [selectedColor, setSelectedColor] = useState('black');
    const [lineWidth, setLineWidth] = useState(2);
  return (
    <div className='absolute right-12 top-0 w-40 p-3 rounded-lg bg-white dark:bg-stone-900 shadow-xl z-50'>
      <ColorPicker selectedColor={selectedColor} changeColor={(color)=>{
        setSelectedColor(color);
        onclose();
      }}/>

      <SizeSlider lineWidth={lineWidth} changeWidth={(width)=>setLineWidth(width)}/>
    </div>
  )
}

export default PenTool
