import dotenv from 'dotenv';
dotenv.config();

/**
 * Function to generate an outline based on the provided article ID.
 *
 * @param {Object} args - Arguments for the outline generation.
 * @param {string} args.articleId - The ID of the article for which to generate the outline.
 * @returns {Promise<Object>} - The result of the outline generation.
 */
const executeFunction = async ({ articleId }) => {
  const pythonHost = process.env.PYTHON_HOST;  // will be provided by the user
  const url = `${pythonHost}/generate-outline`;
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({ articleId });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating outline:', error);
    return { error: 'An error occurred while generating the outline.' };
  }
};

/**
 * Tool configuration for generating outlines based on article ID.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_outline',
      description: 'Generate an outline based on the provided article ID.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article for which to generate the outline.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };