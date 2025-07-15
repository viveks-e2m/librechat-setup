/**
 * Function to fetch the list of managers from the API.
 *
 * @returns {Promise<Object>} - The result of the managers list request.
 */
const executeFunction = async () => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/users/list-managers`;

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
    console.error('Error fetching managers list:', error);
    return { error: 'An error occurred while fetching the managers list.' };
  }
};

/**
 * Tool configuration for fetching the list of managers.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_managers_list',
      description: 'Fetch the list of managers from the API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };