import React from 'react'
import { Page } from './Page'

export const PagesList = ({ pages, onPageClick, onDelete }) => {
  return (
    <>
      {pages.length === 0
        ? <p>No pages available</p>
        : pages.map((page) => {
            console.log('Page slug:', page.slug)// Debugging

            return (
              <div key={page.slug}>
                <Page
                  page={page}
                  onClick={() => onPageClick(page.slug)}
                  onDelete={() => onDelete(page.slug)} // Prevent event and pass the slug
                />
              </div>
            )
          })
      }
    </>
  )
}
