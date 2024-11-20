import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'
import { ArticleDetails } from './ArticleDetails'
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch the list of pages
  async function fetchPages () {
    try {
      const response = await fetch(`${apiURL}/wiki`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const pagesData = await response.json()
      setPages(pagesData)
      setIsLoading(false)
    } catch (err) {
      console.log('Oh no an error! ', err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  // Fetch the details of a single article
  async function fetchArticleDetails (slug) {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`)
      if (!response.ok) {
        throw new Error('Article not found')
      }
      const articleData = await response.json()
      setSelectedArticle(articleData)
    } catch (err) {
      console.log('Error fetching article details', err)
      setError(err.message)
    }
  }

  // Fetch the pages on initial load
  useEffect(() => {
    fetchPages()
  }, [])

  // Handle the "Back to Wiki List" button
  const handleBackToList = () => {
    setSelectedArticle(null)
  }

  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>

      {/* Loading state */}
      {isLoading && <p>Loading pages...</p>}
      {/* Error state */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* If an article is selected, show article details */}
      {selectedArticle
      ? (
        <ArticleDetails article={selectedArticle} onBack={handleBackToList} />
      )
       : (
        // Show the pages list when no article is selected
        <PagesList pages={pages} onPageClick={fetchArticleDetails} />
      )}
    </main>
  )
}
