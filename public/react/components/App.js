import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'
import { ArticleDetails } from './ArticleDetails'
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingArticle, setIsAddingArticle] = useState(false)
  const [error, setError] = useState(null)
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    authorName: '',
    authorEmail: '',
    tags: ''
  })

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
  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target
    setNewArticle({
      ...newArticle,
      [name]: value
    })
  }
  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()
    const { title, content, authorName, authorEmail, tags } = newArticle

    const articleData = {
      title,
      content,
      name: authorName,
      email: authorEmail,
      tags
    }

    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
      })

      const newPage = await response.json()
      setPages([...pages, newPage]) // Add new page to the list
      setIsAddingArticle(false) // Switch back to list view
      setNewArticle({ title: '', content: '', authorName: '', authorEmail: '', tags: '' }) // Reset form
    } catch (error) {
      console.error('Error creating page', error)
    }
  }
  // Handle delete Method
  const handleDelete = async (slug) => {
    console.log('Slug type:', typeof slug)
    console.log('Slug value:', slug)
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete article')
      }
      // Update the pages list in state after deletion
      setPages((prevPages) => prevPages.filter((page) => page.slug !== slug))
      setSelectedArticle(null) // Optionally reset the selected article after deletion
    } catch (err) {
      console.error('Error deleting article', err)
    }
  }

  return (
<main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>
      {/* Loading state */}
      {isLoading && <p>Loading pages...</p>}

      {isAddingArticle
      ? (
      <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newArticle.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              name="content"
              value={newArticle.content}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="authorName">Author Name:</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={newArticle.authorName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="authorEmail">Author Email:</label>
            <input
              type="email"
              id="authorEmail"
              name="authorEmail"
              value={newArticle.authorEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="tags">Tags (separate by spaces):</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={newArticle.tags}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Create Article</button>
          <button type="button" onClick={() => setIsAddingArticle(false)}>Cancel</button>
        </form>
      )
      : (selectedArticle
      ?
      (<>
          <ArticleDetails article={selectedArticle} onBack={handleBackToList} onDelete={handleDelete} />
        </>)
      :
        (<>
          <button onClick={() => setIsAddingArticle(true)}>Add New Article</button>
          <PagesList pages={pages} onPageClick={fetchArticleDetails} />
        </>)
      )}
    </main>
  )
}
