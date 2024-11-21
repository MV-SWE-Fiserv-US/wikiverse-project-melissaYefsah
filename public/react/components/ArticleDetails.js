import React from 'react'

export const ArticleDetails = ({ article, onBack, onDelete }) => {
  return (
    <div>
      <h2>{article.title}</h2>
      <p><strong>Author:</strong> {article.author ? article.author.name : 'Unknown'}</p>
      <p><strong>Content:</strong> {article.content}</p>
      <p><strong>Tags:</strong> {article.tags ? article.tags.map(tag => tag.name).join(', ') : 'No tags'}</p>
      <p><strong>Created At:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>

      <button onClick={onBack}>Back to Wiki List</button>
      <button onClick={onDelete}>DELETE</button>
    </div>
  )
}
