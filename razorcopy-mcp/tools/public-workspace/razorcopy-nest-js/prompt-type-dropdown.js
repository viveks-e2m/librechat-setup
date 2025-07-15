/**
 * Function to fetch prompt types from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.search] - Optional search term to filter prompt types.
 * @returns {Promise<Object>} - The result of the prompt types fetch.
 */
const executeFunction = async ({ search } = {}) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/prompt-types/list`);
    if (search) {
      url.searchParams.append('search', search);
    }

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error fetching prompt types:', error);
    return { error: 'An error occurred while fetching prompt types.' };
  }
};

/**
 * Tool configuration for fetching prompt types from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_prompt_types',
      description: 'Fetch prompt types from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          search: {
            type: 'string',
            description: 'Optional search term to filter prompt types.'
          }
        }
      }
    }
  }
};

export { apiTool };