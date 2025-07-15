/**
 * Function to update the user's password.
 *
 * @param {Object} args - Arguments for the password update.
 * @param {string} args.old_password - The user's current password.
 * @param {string} args.new_password - The new password to set.
 * @returns {Promise<Object>} - The result of the password update.
 */
const executeFunction = async ({ old_password, new_password }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  const url = `${host}/auth/update-password`;

  const body = JSON.stringify({
    old_password,
    new_password
  });

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
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
    console.error('Error updating password:', error);
    return { error: 'An error occurred while updating the password.' };
  }
};

/**
 * Tool configuration for updating the user's password.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_password',
      description: 'Update the user\'s password.',
      parameters: {
        type: 'object',
        properties: {
          old_password: {
            type: 'string',
            description: 'The user\'s current password.'
          },
          new_password: {
            type: 'string',
            description: 'The new password to set.'
          }
        },
        required: ['old_password', 'new_password']
      }
    }
  }
};

export { apiTool };