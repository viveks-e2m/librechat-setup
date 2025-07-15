/**
 * Function to delete a guideline by its ID.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.guidelineId - The ID of the guideline to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ guidelineId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the deletion request
    const url = `${host}/guidelines/${guidelineId}`;

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

    // Return a success message or the response data
    return { message: 'Guideline deleted successfully.' };
  } catch (error) {
    console.error('Error deleting guideline:', error);
    return { error: 'An error occurred while deleting the guideline.' };
  }
};

/**
 * Tool configuration for deleting a guideline.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_guideline',
      description: 'Delete a guideline by its ID.',
      parameters: {
        type: 'object',
        properties: {
          guidelineId: {
            type: 'string',
            description: 'The ID of the guideline to delete.'
          }
        },
        required: ['guidelineId']
      }
    }
  }
};

export { apiTool };