/**
 * Function to list users by project.
 *
 * @param {string} projectId - The ID of the project to list users for.
 * @returns {Promise<Object>} - The result of the user list request.
 */
const executeFunction = async (projectId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/users/list-project-members/${projectId}`;

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
      throw new Error(errorData.message || 'An error occurred while fetching users.');
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users by project:', error);
    return { error: 'An error occurred while fetching users by project.' };
  }
};

/**
 * Tool configuration for listing users by project.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_users_by_project',
      description: 'List users by project ID.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to list users for.'
          }
        },
        required: ['projectId']
      }
    }
  }
};

export { apiTool };