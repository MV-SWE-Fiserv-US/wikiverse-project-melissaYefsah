import React from 'react'

export const Form = ({ onChange, onSubmit }) => {
  return (
    <>
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
    </>
  )
}