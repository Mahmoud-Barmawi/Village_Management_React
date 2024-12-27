import React from 'react'

export default function MyButton({value,id,bgColor,btnFn}) {
  return (
    <input className='myButton' onClick={btnFn} style={{ backgroundColor: bgColor }} type="button" value={value} id={id} />
  )
}
