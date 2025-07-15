/**
 * Function to add a new member to a project.
 *
 * @param {Object} args - Arguments for adding a new member.
 * @param {string} args.projectId - The ID of the project to which the member will be added.
 * @param {string} args.memberId - The ID of the member to be added.
 * @returns {Promise<Object>} - The result of the add member operation.
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
      method: 'POST',
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
    console.error('Error adding new member to project:', error);
    return { error: 'An error occurred while adding the member to the project.' };
  }
};

/**
 * Tool configuration for adding a new member to a project.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_new_member_to_project',
      description: 'Add a new member to a project.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to which the member will be added.'
          },
          memberId: {
            type: 'string',
            description: 'The ID of the member to be added.'
          }
        },
        required: ['projectId', 'memberId']
      }
    }
  }
};

export { apiTool };