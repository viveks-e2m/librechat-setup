/**
 * Function to delete a prompt type.
 *
 * @param {string} promptTypeId - The ID of the prompt type to delete.
 * @returns {Promise<Object>} - The result of the deletion request.
 */
const executeFunction = async (promptTypeId) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the deletion request
    const url = `${host}/prompt-types/${promptTypeId}`;

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
    console.error('Error deleting prompt type:', error);
    return { error: 'An error occurred while deleting the prompt type.' };
  }
};

/**
 * Tool configuration for deleting a prompt type.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_prompt_type',
      description: 'Delete a prompt type by its ID.',
      parameters: {
        type: 'object',
        properties: {
          promptTypeId: {
            type: 'string',
            description: 'The ID of the prompt type to delete.'
          }
        },
        required: ['promptTypeId']
      }
    }
  }
};

export { apiTool };