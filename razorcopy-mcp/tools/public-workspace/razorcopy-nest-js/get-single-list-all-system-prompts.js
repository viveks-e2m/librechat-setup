/**
 * Function to get a single system prompt by its ID.
 *
 * @param {string} promptId - The ID of the system prompt to retrieve.
 * @returns {Promise<Object>} - The result of the system prompt retrieval.
 */
const executeFunction = async (promptId) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the request
    const url = `${host}/system-prompts/${promptId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error fetching system prompt:', error);
    return { error: 'An error occurred while fetching the system prompt.' };
  }
};

/**
 * Tool configuration for fetching a single system prompt.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_single_system_prompt',
      description: 'Fetch a single system prompt by its ID.',
      parameters: {
        type: 'object',
        properties: {
          promptId: {
            type: 'string',
            description: 'The ID of the system prompt to retrieve.'
          }
        },
        required: ['promptId']
      }
    }
  }
};

export { apiTool };