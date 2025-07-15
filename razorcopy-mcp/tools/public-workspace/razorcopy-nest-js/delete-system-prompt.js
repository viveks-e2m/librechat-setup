/**
 * Function to delete a system prompt.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.promptId - The ID of the system prompt to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ promptId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the delete request
    const url = `${host}/system-prompts/${promptId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
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
    console.error('Error deleting system prompt:', error);
    return { error: 'An error occurred while deleting the system prompt.' };
  }
};

/**
 * Tool configuration for deleting a system prompt.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_system_prompt',
      description: 'Delete a system prompt by its ID.',
      parameters: {
        type: 'object',
        properties: {
          promptId: {
            type: 'string',
            description: 'The ID of the system prompt to delete.'
          }
        },
        required: ['promptId']
      }
    }
  }
};

export { apiTool };