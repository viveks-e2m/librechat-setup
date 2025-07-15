/**
 * Function to list all guidelines from the Razorcopy API.
 *
 * @returns {Promise<Object>} - The response containing the list of guidelines.
 */
const executeFunction = async () => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Set up the URL for the request
    const url = `${host}/guidelines`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
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
    console.error('Error listing guidelines:', error);
    return { error: 'An error occurred while listing guidelines.' };
  }
};

/**
 * Tool configuration for listing guidelines from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_guidelines',
      description: 'List all guidelines from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };