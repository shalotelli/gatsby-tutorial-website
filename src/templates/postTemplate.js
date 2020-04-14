import React from 'react'
import {graphql} from 'gatsby'

export default function PostTemplate({data}) {
  const {markdownRemark: {frontmatter, html}} = data

  return (
    <>
      <h1 className="text-5xl">{frontmatter.title}</h1>
      <h1 className="text-gray-500 text-3xl">{frontmatter.date}</h1>

      <div className="my-5" dangerouslySetInnerHTML={{__html: html}}></div>
    </>
  )
}

export const pageQuery = graphql`
query($path: String!) {
  markdownRemark(frontmatter: {path: {eq: $path}}) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      path
      title
    }
  }
}
`