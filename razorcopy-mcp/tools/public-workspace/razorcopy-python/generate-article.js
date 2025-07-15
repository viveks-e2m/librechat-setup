import dotenv from 'dotenv';
dotenv.config();
/**
 * Function to generate an article using the Razorcopy API.
 *
 * @param {Object} args - Arguments for generating the article.
 * @param {string} args.articleId - The ID of the article to be generated.
 * @param {string} args.requestId - The ID of the request for generating the article.
 * @returns {Promise<Object>} - The result of the article generation.
 */
const executeFunction = async ({ articleId, requestId }) => {
  const pythonHost = process.env.PYTHON_HOST;  // will be provided by the user
  const url = `${pythonHost}/get-articles`;
  const data = {
    articleId,
    requestId
  };

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error generating article:', error);
    return { error: 'An error occurred while generating the article.' };
  }
};

/**
 * Tool configuration for generating articles using the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_article',
      description: 'Generate an article using the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to be generated.'
          },
          requestId: {
            type: 'string',
            description: 'The ID of the request for generating the article.'
          }
        },
        required: ['articleId', 'requestId']
      }
    }
  }
};

export { apiTool };