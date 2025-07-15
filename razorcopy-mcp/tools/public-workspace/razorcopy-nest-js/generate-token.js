/**
 * Function to generate an access token.
 *
 * @param {Object} args - Arguments for generating the token.
 * @param {string} args.refreshToken - The refresh token used for generating the access token.
 * @returns {Promise<Object>} - The result of the token generation.
 */
const executeFunction = async ({ refreshToken }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Set up the request URL
    const url = `${host}/auth/generate-token`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${refreshToken}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
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
    console.error('Error generating access token:', error);
    return { error: 'An error occurred while generating the access token.' };
  }
};

/**
 * Tool configuration for generating an access token.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_token',
      description: 'Generate an access token using a refresh token.',
      parameters: {
        type: 'object',
        properties: {
          refreshToken: {
            type: 'string',
            description: 'The refresh token used for generating the access token.'
          }
        },
        required: ['refreshToken']
      }
    }
  }
};

export { apiTool };