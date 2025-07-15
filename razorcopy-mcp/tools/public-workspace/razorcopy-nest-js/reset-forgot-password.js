/**
 * Function to reset the password using a token.
 *
 * @param {Object} args - Arguments for the password reset.
 * @param {string} args.token - The token for password reset.
 * @param {string} args.password - The new password to set.
 * @returns {Promise<Object>} - The result of the password reset operation.
 */
const executeFunction = async ({ token, password }) => {
  const host = 'http://localhost:8001';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL for the password reset
    const url = `${host}/auth/password-reset`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    };

    // Prepare the request body
    const body = JSON.stringify({ token, password });

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
    console.error('Error resetting password:', error);
    return { error: 'An error occurred while resetting the password.' };
  }
};

/**
 * Tool configuration for resetting the password.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'reset_forgot_password',
      description: 'Reset the password using a token.',
      parameters: {
        type: 'object',
        properties: {
          token: {
            type: 'string',
            description: 'The token for password reset.'
          },
          password: {
            type: 'string',
            description: 'The new password to set.'
          }
        },
        required: ['token', 'password']
      }
    }
  }
};

export { apiTool };