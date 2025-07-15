/**
 * Function to remove a project member.
 *
 * @param {Object} args - Arguments for the removal.
 * @param {string} args.projectId - The ID of the project.
 * @param {string} args.memberId - The ID of the member to be removed.
 * @returns {Promise<Object>} - The result of the removal operation.
 */
const executeFunction = async ({ projectId, memberId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL with path parameters
    const url = `${host}/projects/${projectId}/project-member/${memberId}`;

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
    console.error('Error removing project member:', error);
    return { error: 'An error occurred while removing the project member.' };
  }
};

/**
 * Tool configuration for removing a project member.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'remove_project_member',
      description: 'Remove a member from a project.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project.'
          },
          memberId: {
            type: 'string',
            description: 'The ID of the member to be removed.'
          }
        },
        required: ['projectId', 'memberId']
      }
    }
  }
};

export { apiTool };