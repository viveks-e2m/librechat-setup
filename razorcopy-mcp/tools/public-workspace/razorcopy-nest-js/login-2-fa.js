/**
 * Function to log in with 2FA using email, password, and a verification code.
 *
 * @param {Object} args - Arguments for the login.
 * @param {string} args.email - The email of the user.
 * @param {string} args.password - The password of the user.
 * @param {string} args.code - The 2FA verification code.
 * @returns {Promise<Object>} - The result of the login attempt.
 */
const executeFunction = async ({ email, password, code }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  const url = `${host}/auth/login`;

  const body = JSON.stringify({
    email,
    password,
    code
  });

  try {
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
    console.error('Error during login:', error);
    return { error: 'An error occurred during login.' };
  }
};

/**
 * Tool configuration for logging in with 2FA.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'login_2fa',
      description: 'Log in with 2FA using email, password, and verification code.',
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
          },
          code: {
            type: 'string',
            description: 'The 2FA verification code.'
          }
        },
        required: ['email', 'password', 'code']
      }
    }
  }
};

export { apiTool };