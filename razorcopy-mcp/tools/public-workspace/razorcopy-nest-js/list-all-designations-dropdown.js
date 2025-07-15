/**
 * Function to list all designations from the API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {number} [args.page=1] - The page number for pagination.
 * @param {number} [args.limit=10] - The number of results to return per page.
 * @param {string} [args.search] - The search term to filter designations.
 * @param {string} [args.sort] - The sorting order for the results.
 * @returns {Promise<Object>} - The result of the designation list request.
 */
const executeFunction = async ({ page = 1, limit = 10, search = '', sort = '' }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/designations/list`);
    if (page) url.searchParams.append('page', page);
    if (limit) url.searchParams.append('limit', limit);
    if (search) url.searchParams.append('search', search);
    if (sort) url.searchParams.append('sort', sort);

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
    console.error('Error listing designations:', error);
    return { error: 'An error occurred while listing designations.' };
  }
};

/**
 * Tool configuration for listing designations from the API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_designations',
      description: 'List all designations from the API.',
      parameters: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'The page number for pagination.'
          },
          limit: {
            type: 'integer',
            description: 'The number of results to return per page.'
          },
          search: {
            type: 'string',
            description: 'The search term to filter designations.'
          },
          sort: {
            type: 'string',
            description: 'The sorting order for the results.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };