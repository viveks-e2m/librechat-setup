/**
 * Function to view a project from the Razorcopy API.
 *
 * @param {string} projectId - The ID of the project to view.
 * @returns {Promise<Object>} - The result of the project view request.
 */
const executeFunction = async (projectId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the project
    const url = `${host}/projects/${projectId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
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
    console.error('Error viewing project:', error);
    return { error: 'An error occurred while viewing the project.' };
  }
};

/**
 * Tool configuration for viewing a project from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'view_project',
      description: 'View a project from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to view.'
          }
        },
        required: ['projectId']
      }
    }
  }
};

export { apiTool };