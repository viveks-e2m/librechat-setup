/**
 * Function to find all projects.
 *
 * @param {Object} args - Arguments for the project search.
 * @param {string} [args.search] - The search term for filtering projects.
 * @param {number} [args.page=1] - The page number for pagination.
 * @param {number} [args.limit=-1] - The number of projects to return.
 * @param {string} [args.sort="id:desc"] - The sorting order for the projects.
 * @param {string} [args.user_id] - The user ID to filter projects by user.
 * @returns {Promise<Object>} - The result of the project search.
 */
const executeFunction = async ({ search, page = 1, limit = -1, sort = 'id:desc', user_id }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/projects`);
    if (search) url.searchParams.append('search', search);
    if (page) url.searchParams.append('page', page);
    if (limit) url.searchParams.append('limit', limit);
    if (sort) url.searchParams.append('sort', sort);
    if (user_id) url.searchParams.append('user_id', user_id);

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
    console.error('Error finding projects:', error);
    return { error: 'An error occurred while finding projects.' };
  }
};

/**
 * Tool configuration for finding all projects.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'find_all_projects',
      description: 'Find all projects.',
      parameters: {
        type: 'object',
        properties: {
          search: {
            type: 'string',
            description: 'The search term for filtering projects.'
          },
          page: {
            type: 'integer',
            description: 'The page number for pagination.'
          },
          limit: {
            type: 'integer',
            description: 'The number of projects to return.'
          },
          sort: {
            type: 'string',
            description: 'The sorting order for the projects.'
          },
          user_id: {
            type: 'string',
            description: 'The user ID to filter projects by user.'
          }
        }
      }
    }
  }
};

export { apiTool };