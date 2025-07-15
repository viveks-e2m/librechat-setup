/**
 * Function to delete a meeting note.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.id - The ID of the meeting note to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ id }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the delete request
    const url = `${host}/meeting-notes/${id}`;

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
    console.error('Error deleting meeting note:', error);
    return { error: 'An error occurred while deleting the meeting note.' };
  }
};

/**
 * Tool configuration for deleting a meeting note.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_meeting_note',
      description: 'Delete a meeting note by ID.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the meeting note to delete.'
          }
        },
        required: ['id']
      }
    }
  }
};

export { apiTool };