/**
 * Function to retrieve the complete dashboard overview.
 *
 * @returns {Promise<Object>} - The result of the dashboard overview request.
 */
const executeFunction = async () => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${host}/dashboard/overview`, {
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
    console.error('Error retrieving dashboard overview:', error);
    return { error: 'An error occurred while retrieving the dashboard overview.' };
  }
};

/**
 * Tool configuration for retrieving the complete dashboard overview.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'complete_dashboard_overview',
      description: 'Retrieve the complete dashboard overview.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };