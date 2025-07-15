/**
 * Function to list agencies from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the agency listing.
 * @param {number} [args.page=1] - The page number for pagination.
 * @param {number} [args.limit=10] - The number of records to return per page.
 * @param {string} [args.search="Agency Member"] - The search term for filtering agency members.
 * @param {boolean} [args.is_active=true] - Filter for active agency members.
 * @param {string} [args.sort="is_active:asc"] - The sorting order for the results.
 * @returns {Promise<Object>} - The result of the agency listing.
 */
const executeFunction = async ({ page = 1, limit = 10, search = "Agency Member", is_active = true, sort = "is_active:asc" }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/users/agency-members`);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('search', search);
    url.searchParams.append('is_active', is_active.toString());
    url.searchParams.append('sort', sort);

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
    console.error('Error listing agencies:', error);
    return { error: 'An error occurred while listing agencies.' };
  }
};

/**
 * Tool configuration for listing agencies from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_agencies',
      description: 'List agencies from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'The page number for pagination.'
          },
          limit: {
            type: 'integer',
            description: 'The number of records to return per page.'
          },
          search: {
            type: 'string',
            description: 'The search term for filtering agency members.'
          },
          is_active: {
            type: 'boolean',
            description: 'Filter for active agency members.'
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