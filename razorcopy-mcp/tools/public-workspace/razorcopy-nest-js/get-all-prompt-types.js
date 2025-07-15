/**
 * Function to get all prompt types from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {number} [args.page=1] - The page number to retrieve.
 * @param {number} [args.limit=10] - The number of prompt types to return per page.
 * @returns {Promise<Object>} - The result of the prompt types retrieval.
 */
const executeFunction = async ({ page = 1, limit = 10 }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/prompt-types`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

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
 * Tool configuration for getting all prompt types from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_prompt_types',
      description: 'Get all prompt types from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'The page number to retrieve.'
          },
          limit: {
            type: 'integer',
            description: 'The number of prompt types to return per page.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };