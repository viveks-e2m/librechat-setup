/**
 * Function to perform auto-login for admin users.
 *
 * @param {Object} args - Arguments for the auto-login request.
 * @param {string} args.user_id - The ID of the user to log in.
 * @returns {Promise<Object>} - The result of the auto-login request.
 */
const executeFunction = async ({ user_id }) => {
  const host = 'http://localhost:8001';
  const accessToken = ''; // will be provided by the user

  try {
    // Construct the URL for the auto-login endpoint
    const url = `${host}/auth/auto-login`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If an access token is provided, add it to the Authorization header
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // Prepare the request body
    const body = JSON.stringify({ user_id });

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
    console.error('Error during auto-login:', error);
    return { error: 'An error occurred during auto-login.' };
  }
};

/**
 * Tool configuration for auto-login for admin users.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'auto_login',
      description: 'Perform auto-login for admin users.',
      parameters: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            description: 'The ID of the user to log in.'
          }
        },
        required: ['user_id']
      }
    }
  }
};

export { apiTool };