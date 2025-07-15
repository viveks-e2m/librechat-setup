/**
 * Function to log in to the application.
 *
 * @param {Object} args - Arguments for the login.
 * @param {string} args.email - The email of the user.
 * @param {string} args.password - The password of the user.
 * @returns {Promise<Object>} - The result of the login attempt.
 */
const executeFunction = async ({ email, password }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the login endpoint
    const url = `${host}/auth/login`;

    // Set up the request body
    const body = JSON.stringify({ email, password });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error logging in:', error);
    return { error: 'An error occurred while logging in.' };
  }
};

/**
 * Tool configuration for logging in to the application.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'login',
      description: 'Log in to the application.',
      parameters: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'The email of the user.'
          },
          password: {
            type: 'string',
            description: 'The password of the user.'
          }
        },
        required: ['email', 'password']
      }
    }
  }
};

export { apiTool };