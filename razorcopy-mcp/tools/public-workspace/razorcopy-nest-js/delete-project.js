/**
 * Function to delete a project from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the delete operation.
 * @param {string} args.projectId - The ID of the project to delete.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async ({ projectId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the delete request
    const url = `${host}/projects/${projectId}`;

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
    console.error('Error deleting project:', error);
    return { error: 'An error occurred while deleting the project.' };
  }
};

/**
 * Tool configuration for deleting a project from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_project',
      description: 'Delete a project from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to delete.'
          }
        },
        required: ['projectId']
      }
    }
  }
};

export { apiTool };