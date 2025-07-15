/**
 * Function to list all roles from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the role listing.
 * @param {number} [args.limit=-1] - The limit of roles to fetch.
 * @param {number} [args.page=12] - The page number for pagination.
 * @returns {Promise<Object>} - The result of the roles listing.
 */
const executeFunction = async ({ limit = -1, page = 12 }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/roles`);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('page', page.toString());

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
    console.error('Error listing roles:', error);
    return { error: 'An error occurred while listing roles.' };
  }
};

/**
 * Tool configuration for listing roles from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_all_roles',
      description: 'List all roles from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          limit: {
            type: 'integer',
            description: 'The limit of roles to fetch.'
          },
          page: {
            type: 'integer',
            description: 'The page number for pagination.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };