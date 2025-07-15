/**
 * Function to get a single prompt type from the Razorcopy API.
 *
 * @param {string} promptId - The ID of the prompt type to retrieve.
 * @returns {Promise<Object>} - The result of the prompt type retrieval.
 */
const executeFunction = async (promptId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/prompt-types/${promptId}`;

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
    console.error('Error fetching prompt type:', error);
    return { error: 'An error occurred while fetching the prompt type.' };
  }
};

/**
 * Tool configuration for getting a single prompt type from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_single_prompt_type',
      description: 'Get a single prompt type from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          promptId: {
            type: 'string',
            description: 'The ID of the prompt type to retrieve.'
          }
        },
        required: ['promptId']
      }
    }
  }
};

export { apiTool };