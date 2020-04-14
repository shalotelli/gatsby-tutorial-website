/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path')

exports.createPages = async ({actions, graphql, reporter}) => {
  const {createPage} = actions
  
  const PostTemplate = path.resolve('src/templates/postTemplate.js')

  try {
    const result = await graphql(`
      query MyQuery {
        allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}, limit: 1000) {
          edges {
            node {
              frontmatter {
                path
              }
            }
          }
        }
      }
    `)

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: PostTemplate,
        context: {}
      })
    })
  } catch(e) {
    reporter.panicOnBuild('Error while running GraphQL query')
    return
  }
}