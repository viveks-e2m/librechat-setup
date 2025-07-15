/**
 * Function to list all guidelines from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.search] - Optional search term to filter guidelines.
 * @returns {Promise<Object>} - The result of the guidelines list request.
 */
const executeFunction = async ({ search }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL
    const url = new URL(`${host}/guidelines/list`);
    if (search) {
      url.searchParams.append('search', search);
    }

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'An error occurred while fetching guidelines.');
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
        properties: {
          search: {
            type: 'string',
            description: 'Optional search term to filter guidelines.'
          }
        }
      }
    }
  }
};

export { apiTool };