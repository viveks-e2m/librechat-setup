/**
 * Function to retrieve article content from Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.articleId - The ID of the article to retrieve content for.
 * @returns {Promise<Object>} - The content of the article.
 */
const executeFunction = async ({ articleId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with the article ID
    const url = `${host}/article-documents/${articleId}/content?version=201`;

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
    console.error('Error retrieving article content:', error);
    return { error: 'An error occurred while retrieving article content.' };
  }
};

/**
 * Tool configuration for retrieving article content from Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_article_content',
      description: 'Retrieve content for a specific article from Razorcopy API.',
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