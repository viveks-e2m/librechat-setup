/**
 * Function to generate a title for a specific article.
 *
 * @param {Object} args - Arguments for generating the title.
 * @param {string} args.articleId - The ID of the article for which to generate the title.
 * @returns {Promise<Object>} - The result of the title generation.
 */
const executeFunction = async ({ articleId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with the articleId path variable
    const url = `${host}/article/${articleId}/topics`;

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
    console.error('Error generating title:', error);
    return { error: 'An error occurred while generating the title.' };
  }
};

/**
 * Tool configuration for generating a title for an article.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_title',
      description: 'Generate a title for a specific article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article for which to generate the title.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };