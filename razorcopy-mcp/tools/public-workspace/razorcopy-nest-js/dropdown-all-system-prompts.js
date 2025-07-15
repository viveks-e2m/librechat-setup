/**
 * Function to fetch all system prompts from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.type="topic_title"] - The type of system prompts to fetch.
 * @param {string} [args.search] - Optional search term to filter prompts.
 * @returns {Promise<Object>} - The result of the system prompts fetch.
 */
const executeFunction = async ({ type = 'topic_title', search }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/system-prompts/list`);
    url.searchParams.append('type', type);
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
    console.error('Error fetching system prompts:', error);
    return { error: 'An error occurred while fetching system prompts.' };
  }
};

/**
 * Tool configuration for fetching system prompts from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_system_prompts',
      description: 'Fetch all system prompts from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'The type of system prompts to fetch.'
          },
          search: {
            type: 'string',
            description: 'Optional search term to filter prompts.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };