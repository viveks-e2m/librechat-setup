/**
 * Function to update a project in Razorcopy.
 *
 * @param {Object} args - Arguments for the project update.
 * @param {string} args.projectId - The ID of the project to update.
 * @param {Object} args.updateData - The data to update the project with.
 * @param {string} [args.host='http://localhost:8001'] - The host URL for the API.
 * @returns {Promise<Object>} - The result of the project update.
 */
const executeFunction = async ({ projectId, updateData, }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the PATCH request
    const url = `${host}/projects/${projectId}`;

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
      method: 'PATCH',
      headers,
      body: JSON.stringify(updateData),
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
    console.error('Error updating project:', error);
    return { error: 'An error occurred while updating the project.' };
  }
};

/**
 * Tool configuration for updating a project in Razorcopy.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_project',
      description: 'Update a project in Razorcopy.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to update.'
          },
          updateData: {
            type: 'object',
            description: 'The data to update the project with.'
          },
          host: {
            type: 'string',
            description: 'The host URL for the API.'
          }
        },
        required: ['projectId', 'updateData']
      }
    }
  }
};

export { apiTool };