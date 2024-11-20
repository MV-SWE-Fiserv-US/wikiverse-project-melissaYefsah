import React from 'react'
import { Page } from './Page'

export const PagesList = ({ pages, onPageClick }) => {
  return (
    <>
      {pages.length === 0
	? (
        <p>No pages available</p>
    )
	: (
        pages.map((page) => (
          <div key={page.slug}>
            <Page page={page} onClick={() => onPageClick(page.slug)} />
          </div>
        ))
      )}
    </>
  )
}
