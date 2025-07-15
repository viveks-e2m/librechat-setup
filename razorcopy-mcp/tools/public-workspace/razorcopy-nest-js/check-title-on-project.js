/**
 * Function to check the title on a project.
 *
 * @param {Object} args - Arguments for the title check.
 * @param {string} args.projectId - The ID of the project to check the title for.
 * @param {string} args.title - The title to check.
 * @returns {Promise<Object>} - The result of the title check.
 */
const executeFunction = async ({ projectId, title }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    const url = `${host}/article/${projectId}/check-title`;
    const body = JSON.stringify({ title });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
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
    console.error('Error checking title on project:', error);
    return { error: 'An error occurred while checking the title on the project.' };
  }
};

/**
 * Tool configuration for checking the title on a project.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'check_title_on_project',
      description: 'Check the title on a project.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to check the title for.'
          },
          title: {
            type: 'string',
            description: 'The title to check.'
          }
        },
        required: ['projectId', 'title']
      }
    }
  }
};

export { apiTool };