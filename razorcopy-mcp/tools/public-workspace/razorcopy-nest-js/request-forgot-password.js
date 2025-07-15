/**
 * Function to request a password reset for a user.
 *
 * @param {Object} args - Arguments for the password reset request.
 * @param {string} args.email - The email address of the user requesting the password reset.
 * @returns {Promise<Object>} - The result of the password reset request.
 */
const executeFunction = async ({ email }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the password reset request
    const url = `${host}/auth/forgot-password`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ email });

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
    console.error('Error requesting password reset:', error);
    return { error: 'An error occurred while requesting password reset.' };
  }
};

/**
 * Tool configuration for requesting a password reset.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'request_forgot_password',
      description: 'Request a password reset for a user.',
      parameters: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'The email address of the user requesting the password reset.'
          }
        },
        required: ['email']
      }
    }
  }
};

export { apiTool };