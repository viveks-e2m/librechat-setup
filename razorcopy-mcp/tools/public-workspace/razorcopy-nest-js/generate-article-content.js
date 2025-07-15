/**
 * Function to generate article content using the Razorcopy API.
 *
 * @param {Object} args - Arguments for generating article content.
 * @param {string} args.articleId - The ID of the article for which content is to be generated.
 * @param {string} args.model - The model to use for content generation (e.g., "open_ai", "gemini").
 * @param {string} args.requestId - A unique identifier for the request.
 * @returns {Promise<Object>} - The response from the article generation request.
 */
const executeFunction = async ({ articleId, model, requestId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with the article ID
    const url = `${host}/article/${articleId}/ai-content`;

    // Set up the request body
    const body = JSON.stringify({
      model,
      requestId
    });

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
      body
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
    console.error('Error generating article content:', error);
    return { error: 'An error occurred while generating article content.' };
  }
};

/**
 * Tool configuration for generating article content using the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_article_content',
      description: 'Generate content for a specific article using the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article for which content is to be generated.'
          },
          model: {
            type: 'string',
            description: 'The model to use for content generation (e.g., "open_ai", "gemini").'
          },
          requestId: {
            type: 'string',
            description: 'A unique identifier for the request.'
          }
        },
        required: ['articleId', 'model', 'requestId']
      }
    }
  }
};

export { apiTool };