/**
 * Function to bulk assign projects to users.
 *
 * @param {Object} args - Arguments for the bulk assignment.
 * @param {Array<string>} args.projectIds - The IDs of the projects to assign.
 * @param {Array<string>} args.userIds - The IDs of the users to whom the projects will be assigned.
 * @returns {Promise<Object>} - The result of the bulk assignment operation.
 */
const executeFunction = async ({ projectIds, userIds }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    const url = `${host}/projects/project-bulk-assign`;
    const body = JSON.stringify({ projectIds, userIds });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error during project bulk assignment:', error);
    return { error: 'An error occurred while assigning projects.' };
  }
};

/**
 * Tool configuration for bulk assigning projects to users.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'project_bulk_assign',
      description: 'Bulk assign projects to users.',
      parameters: {
        type: 'object',
        properties: {
          projectIds: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The IDs of the projects to assign.'
          },
          userIds: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The IDs of the users to whom the projects will be assigned.'
          }
        },
        required: ['projectIds', 'userIds']
      }
    }
  }
};

export { apiTool };