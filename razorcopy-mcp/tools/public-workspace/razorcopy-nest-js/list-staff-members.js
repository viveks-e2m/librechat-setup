/**
 * Function to list staff members from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the staff members listing.
 * @param {number} [args.page=1] - The page number for pagination.
 * @param {number} [args.limit=10] - The number of staff members to return per page.
 * @param {string} [args.search='Agency Member'] - The search term for filtering staff members.
 * @param {boolean} [args.is_active=false] - Filter for active staff members.
 * @param {string} [args.sort='is_active:asc'] - The sorting order for the results.
 * @returns {Promise<Object>} - The result of the staff members listing.
 */
const executeFunction = async ({ page = 1, limit = 10, search = 'Agency Member', is_active = false, sort = 'is_active:asc' }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/users/staff-members`);
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
    console.error('Error listing staff members:', error);
    return { error: 'An error occurred while listing staff members.' };
  }
};

/**
 * Tool configuration for listing staff members from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_staff_members',
      description: 'List staff members from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            description: 'The page number for pagination.'
          },
          limit: {
            type: 'integer',
            description: 'The number of staff members to return per page.'
          },
          search: {
            type: 'string',
            description: 'The search term for filtering staff members.'
          },
          is_active: {
            type: 'boolean',
            description: 'Filter for active staff members.'
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