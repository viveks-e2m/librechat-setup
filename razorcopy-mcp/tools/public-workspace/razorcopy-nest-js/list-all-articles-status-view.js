/**
 * Function to list all articles with a specific status view.
 *
 * @param {Object} args - Arguments for the article listing.
 * @param {string} args.module - The module to filter articles by (e.g., topics, article).
 * @param {string} args.status - The status of the articles to retrieve (e.g., rejected).
 * @param {string} args.start_date - The start date for filtering articles.
 * @param {string} args.end_date - The end date for filtering articles.
 * @returns {Promise<Object>} - The result of the article listing.
 */
const executeFunction = async ({ module, status, start_date, end_date }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/article/status-view`);
    url.searchParams.append('module', module);
    url.searchParams.append('status', status);
    url.searchParams.append('start_date', start_date);
    url.searchParams.append('end_date', end_date);

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
    console.error('Error listing articles:', error);
    return { error: 'An error occurred while listing articles.' };
  }
};

/**
 * Tool configuration for listing articles with a specific status view.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_articles_status_view',
      description: 'List all articles with a specific status view.',
      parameters: {
        type: 'object',
        properties: {
          module: {
            type: 'string',
            description: 'The module to filter articles by (e.g., topics, article).'
          },
          status: {
            type: 'string',
            description: 'The status of the articles to retrieve (e.g., rejected).'
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
        required: ['module', 'status', 'start_date', 'end_date']
      }
    }
  }
};

export { apiTool };