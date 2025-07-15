/**
 * Function to send AI content request for an article.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.articleId - The ID of the article to send the content request for.
 * @param {string} args.model - The model to use for generating content (e.g., "open_ai").
 * @param {string} args.content - The content to be processed.
 * @param {string} args.requestId - The unique request ID.
 * @param {number} args.avg_word_count - The average word count for the content.
 * @returns {Promise<Object>} - The response from the server.
 */
const executeFunction = async ({ articleId, model, content, requestId, avg_word_count }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  const url = `${host}/webhooks/${articleId}/content`;

  const body = {
    model,
    content,
    requestId,
    avg_word_count
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error sending AI content request:', error);
    return { error: 'An error occurred while sending the AI content request.' };
  }
};

/**
 * Tool configuration for sending AI content requests for articles.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_article_ai_content',
      description: 'Send AI content request for an article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to send the content request for.'
          },
          model: {
            type: 'string',
            description: 'The model to use for generating content.'
          },
          content: {
            type: 'string',
            description: 'The content to be processed.'
          },
          requestId: {
            type: 'string',
            description: 'The unique request ID.'
          },
          avg_word_count: {
            type: 'integer',
            description: 'The average word count for the content.'
          }
        },
        required: ['articleId', 'model', 'content', 'requestId', 'avg_word_count']
      }
    }
  }
};

export { apiTool };