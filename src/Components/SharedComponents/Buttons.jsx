import React from 'react'

export default function Buttons({defaultValue,BtnID}) {
  return (
    <div>
      	<input type="button" defaultValue={defaultValue} id={BtnID} />
    </div>
  )
}
