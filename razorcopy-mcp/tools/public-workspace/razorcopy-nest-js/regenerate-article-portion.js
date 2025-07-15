/**
 * Function to regenerate a portion of an article.
 *
 * @param {Object} args - Arguments for the regeneration.
 * @param {string} args.article - The full article text.
 * @param {string} args.text - The specific portion of the article to modify.
 * @param {string} args.prompt - The prompt for how to modify the article portion.
 * @returns {Promise<Object>} - The result of the article regeneration.
 */
const executeFunction = async ({ article, text, prompt }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${host}/openai/regenerate-article-part`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({ article, text, prompt });

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
    console.error('Error regenerating article portion:', error);
    return { error: 'An error occurred while regenerating the article portion.' };
  }
};

/**
 * Tool configuration for regenerating article portions.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'regenerate_article_portion',
      description: 'Regenerate a portion of an article based on provided text and prompt.',
      parameters: {
        type: 'object',
        properties: {
          article: {
            type: 'string',
            description: 'The full article text.'
          },
          text: {
            type: 'string',
            description: 'The specific portion of the article to modify.'
          },
          prompt: {
            type: 'string',
            description: 'The prompt for how to modify the article portion.'
          }
        },
        required: ['article', 'text', 'prompt']
      }
    }
  }
};

export { apiTool };