import React from 'react'

export default function DynamicText({ text, linkText, linkHref }) {
  return (
    <p>{text} <a href={linkHref}>{linkText}</a></p>
  )
}
