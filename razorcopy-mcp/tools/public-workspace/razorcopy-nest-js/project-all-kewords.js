/**
 * Function to retrieve all keywords for a specific project.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.projectId - The ID of the project to retrieve keywords for.
 * @returns {Promise<Object>} - The result of the keyword retrieval.
 */
const executeFunction = async ({ projectId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with the project ID
    const url = `${host}/article/project/${projectId}/keywords`;

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
    console.error('Error retrieving keywords:', error);
    return { error: 'An error occurred while retrieving keywords.' };
  }
};

/**
 * Tool configuration for retrieving keywords for a project.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_project_keywords',
      description: 'Retrieve all keywords for a specific project.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to retrieve keywords for.'
          }
        },
        required: ['projectId']
      }
    }
  }
};

export { apiTool };