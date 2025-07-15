/**
 * Function to fetch project members from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.projectId - The ID of the project to fetch members for.
 * @returns {Promise<Object>} - The result of the fetch operation, containing project members data.
 */
const executeFunction = async ({ projectId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL with the project ID
    const url = `${host}/projects/${projectId}/members`;

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
    console.error('Error fetching project members:', error);
    return { error: 'An error occurred while fetching project members.' };
  }
};

/**
 * Tool configuration for fetching project members from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_project_members',
      description: 'Fetch project members from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to fetch members for.'
          }
        },
        required: ['projectId']
      }
    }
  }
};

export { apiTool };