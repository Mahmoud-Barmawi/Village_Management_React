import React from 'react'

export default function MyTextInput({id, placeholder, className, value, onChange}) {
  return (
    <input 
      type="text" 
      name="" 
      id={id} 
      placeholder={placeholder} 
      value={value}
      className={className} 
      onChange={onChange} 
    />
  )
}
