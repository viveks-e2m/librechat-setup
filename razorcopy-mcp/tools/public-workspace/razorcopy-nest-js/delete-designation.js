/**
 * Function to delete a designation.
 *
 * @param {string} designationId - The ID of the designation to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async (designationId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${host}/designations/${designationId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error deleting designation:', error);
    return { error: 'An error occurred while deleting the designation.' };
  }
};

/**
 * Tool configuration for deleting a designation.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_designation',
      description: 'Delete a designation by ID.',
      parameters: {
        type: 'object',
        properties: {
          designationId: {
            type: 'string',
            description: 'The ID of the designation to delete.'
          }
        },
        required: ['designationId']
      }
    }
  }
};

export { apiTool };