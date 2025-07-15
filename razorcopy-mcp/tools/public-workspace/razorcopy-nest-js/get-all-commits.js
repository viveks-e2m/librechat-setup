/**
 * Function to get all comments for a specific article.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.articleId - The ID of the article to retrieve comments for.
 * @returns {Promise<Object>} - The result of the comments retrieval.
 */
const executeFunction = async ({ articleId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the request
    const url = `${host}/comments/${articleId}/all-comments`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
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
    console.error('Error retrieving comments:', error);
    return { error: 'An error occurred while retrieving comments.' };
  }
};

/**
 * Tool configuration for retrieving comments for an article.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_comments',
      description: 'Get all comments for a specific article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to retrieve comments for.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };