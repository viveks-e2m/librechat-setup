/**
 * Function to get article content from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.articleId - The ID of the article to retrieve content for.
 * @returns {Promise<Object>} - The response from the API containing article content.
 */
const executeFunction = async ({ articleId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with the article ID
    const url = `${host}/article/${articleId}/ai-content`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
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
    console.error('Error getting article content:', error);
    return { error: 'An error occurred while getting article content.' };
  }
};

/**
 * Tool configuration for getting article content from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_article_content',
      description: 'Retrieve content for a specific article from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to retrieve content for.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };