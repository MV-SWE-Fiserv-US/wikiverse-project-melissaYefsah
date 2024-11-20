import React from 'react'

export const Page = ({ page, onClick }) => {
  return (
    <>
      <h3 onClick={onClick} style={{ cursor: 'pointer', color: 'blue' }}>
        {page.title}
      </h3>
    </>
  )
}
