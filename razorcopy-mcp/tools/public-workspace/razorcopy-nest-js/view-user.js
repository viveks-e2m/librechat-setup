/**
 * Function to view user information from the Razorcopy API.
 *
 * @param {string} userId - The ID of the user to retrieve information for.
 * @returns {Promise<Object>} - The user information or an error message.
 */
const executeFunction = async (userId) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the user request
    const url = `${host}/users/${userId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
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
    console.error('Error fetching user information:', error);
    return { error: 'An error occurred while fetching user information.' };
  }
};

/**
 * Tool configuration for viewing user information from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'view_user',
      description: 'Retrieve user information from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user to retrieve information for.'
          }
        },
        required: ['userId']
      }
    }
  }
};

export { apiTool };