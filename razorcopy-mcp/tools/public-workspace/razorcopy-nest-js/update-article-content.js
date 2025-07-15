/**
 * Function to update article content.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.articleId - The ID of the article to update.
 * @param {string} args.snapshot - The new content for the article.
 * @param {string} args.session_id - The session ID for the update request.
 * @returns {Promise<Object>} - The result of the article update.
 */
const executeFunction = async ({ articleId, snapshot, session_id }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${host}/article-documents/${articleId}/update`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Create the body for the request
    const body = JSON.stringify({
      snapshot,
      session_id,
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating article content:', error);
    return { error: 'An error occurred while updating article content.' };
  }
};

/**
 * Tool configuration for updating article content.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_article_content',
      description: 'Update the content of an article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to update.'
          },
          snapshot: {
            type: 'string',
            description: 'The new content for the article.'
          },
          session_id: {
            type: 'string',
            description: 'The session ID for the update request.'
          }
        },
        required: ['articleId', 'snapshot', 'session_id']
      }
    }
  }
};

export { apiTool };