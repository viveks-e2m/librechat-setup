/**
 * Function to check the progress of a site audit for a specific project.
 *
 * @param {Object} args - Arguments for the progress check.
 * @param {string} args.projectId - The ID of the project to check progress for.
 * @returns {Promise<Object>} - The result of the progress check.
 */
const executeFunction = async ({ projectId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with the project ID
    const url = `${host}/projects/${projectId}/site-audit/progress`;

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
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking progress:', error);
    return { error: 'An error occurred while checking progress.' };
  }
};

/**
 * Tool configuration for checking site audit progress.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'check_progress',
      description: 'Check the progress of a site audit for a specific project.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to check progress for.'
          }
        },
        required: ['projectId']
      }
    }
  }
};

export { apiTool };