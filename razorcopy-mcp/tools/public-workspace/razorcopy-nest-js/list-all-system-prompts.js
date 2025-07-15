/**
 * Function to list all system prompts.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} [args.type] - The type of system prompts to filter by.
 * @returns {Promise<Object>} - The result of the system prompts listing.
 */
const executeFunction = async ({ type } = {}) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL
    const url = new URL(`${host}/system-prompts`);
    if (type) {
      url.searchParams.append('type', type);
    }

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
    console.error('Error listing system prompts:', error);
    return { error: 'An error occurred while listing system prompts.' };
  }
};

/**
 * Tool configuration for listing system prompts.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_system_prompts',
      description: 'List all system prompts.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'The type of system prompts to filter by.'
          }
        }
      }
    }
  }
};

export { apiTool };