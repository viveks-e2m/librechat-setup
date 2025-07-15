/**
 * Function to fetch keyword metrics from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the keyword metrics request.
 * @param {Array<string>} args.keywords - An array of keywords to fetch metrics for.
 * @returns {Promise<Object>} - The result of the keyword metrics fetch.
 */
const executeFunction = async ({ keywords }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/projects/fetch-keyword-metrics`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ keywords });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error fetching keyword metrics:', error);
    return { error: 'An error occurred while fetching keyword metrics.' };
  }
};

/**
 * Tool configuration for fetching keyword metrics from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_keyword_metrics',
      description: 'Fetch keyword metrics from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of keywords to fetch metrics for.'
          }
        },
        required: ['keywords']
      }
    }
  }
};

export { apiTool };