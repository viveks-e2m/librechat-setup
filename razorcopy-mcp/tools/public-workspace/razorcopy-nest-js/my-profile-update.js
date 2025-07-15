/**
 * Function to update user profile information.
 *
 * @param {Object} args - Arguments for the profile update.
 * @param {string} args.country - The country of the user.
 * @param {string} args.state - The state of the user.
 * @param {string} args.city - The city of the user.
 * @returns {Promise<Object>} - The result of the profile update.
 */
const executeFunction = async ({ country, state, city }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the profile update
    const url = `${host}/users/profile`;

    // Prepare the request body
    const body = JSON.stringify({ country, state, city });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error updating profile:', error);
    return { error: 'An error occurred while updating the profile.' };
  }
};

/**
 * Tool configuration for updating user profile information.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_profile',
      description: 'Update user profile information.',
      parameters: {
        type: 'object',
        properties: {
          country: {
            type: 'string',
            description: 'The country of the user.'
          },
          state: {
            type: 'string',
            description: 'The state of the user.'
          },
          city: {
            type: 'string',
            description: 'The city of the user.'
          }
        },
        required: ['country', 'state', 'city']
      }
    }
  }
};

export { apiTool };