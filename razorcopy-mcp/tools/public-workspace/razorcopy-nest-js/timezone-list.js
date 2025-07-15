/**
 * Function to fetch the list of timezones from the Razorcopy API.
 *
 * @returns {Promise<Object>} - The result of the timezone fetch operation.
 */
const executeFunction = async () => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the request
    const url = `${host}/global/timezones`;

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
    console.error('Error fetching timezones:', error);
    return { error: 'An error occurred while fetching timezones.' };
  }
};

/**
 * Tool configuration for fetching the timezone list from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_timezones',
      description: 'Fetch the list of timezones from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };