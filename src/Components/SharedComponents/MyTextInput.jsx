import React from 'react'

export default function MyTextInput({id,type ,placeholder, className, value, onChange}) {
  return (
    <input 
      type={type} 
      name="" 
      id={id} 
      placeholder={placeholder} 
      value={value}
      className={className} 
      onChange={onChange} 
    />
  )
}
