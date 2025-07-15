/**
 * Function to view an article from the Razorcopy API.
 *
 * @param {string} articleId - The ID of the article to retrieve.
 * @returns {Promise<Object>} - The result of the article retrieval.
 */
const executeFunction = async (articleId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the article
    const url = `${host}/article/${articleId}`;

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
    console.error('Error retrieving article:', error);
    return { error: 'An error occurred while retrieving the article.' };
  }
};

/**
 * Tool configuration for viewing an article from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'view_article',
      description: 'View an article from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to retrieve.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };