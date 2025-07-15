/**
 * Function to list all articles from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the article listing.
 * @param {string} [args.project_Id] - The ID of the project to filter articles.
 * @param {number} [args.page=1] - The page number for pagination.
 * @param {string} [args.status] - The status of the articles to filter.
 * @param {string} [args.sort] - The sorting criteria for the articles.
 * @param {string} [args.start_date] - The start date for filtering articles.
 * @param {string} [args.end_date] - The end date for filtering articles.
 * @returns {Promise<Object>} - The result of the article listing.
 */
const executeFunction = async ({ project_Id, page = 1, status, sort, start_date, end_date }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/article`);
    url.searchParams.append('project_Id', project_Id);
    if (page) url.searchParams.append('page', page);
    if (status) url.searchParams.append('status', status);
    if (sort) url.searchParams.append('sort', sort);
    if (start_date) url.searchParams.append('start_date', start_date);
    if (end_date) url.searchParams.append('end_date', end_date);

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
    console.error('Error listing articles:', error);
    return { error: 'An error occurred while listing articles.' };
  }
};

/**
 * Tool configuration for listing articles from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_all_articles',
      description: 'List all articles from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          project_Id: {
            type: 'string',
            description: 'The ID of the project to filter articles.'
          },
          page: {
            type: 'integer',
            description: 'The page number for pagination.'
          },
          status: {
            type: 'string',
            description: 'The status of the articles to filter.'
          },
          sort: {
            type: 'string',
            description: 'The sorting criteria for the articles.'
          },
          start_date: {
            type: 'string',
            description: 'The start date for filtering articles.'
          },
          end_date: {
            type: 'string',
            description: 'The end date for filtering articles.'
          }
        },
        required: ['project_Id']
      }
    }
  }
};

export { apiTool };