/**
 * Function to add custom permissions for a user.
 *
 * @param {Object} args - Arguments for adding custom permissions.
 * @param {string} args.userId - The ID of the user to whom the permission will be added.
 * @param {string} args.permission - The permission to be added.
 * @param {boolean} [args.delete=false] - Indicates whether to delete the permission.
 * @returns {Promise<Object>} - The result of the permission addition.
 */
const executeFunction = async ({ userId, permission, delete: del = false }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  const url = `${host}/roles/user-permissions`;

  const body = JSON.stringify({
    userId,
    permission,
    delete: del
  });

  try {
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
    console.error('Error adding custom permission:', error);
    return { error: 'An error occurred while adding custom permission.' };
  }
};

/**
 * Tool configuration for adding custom permissions for a user.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_custom_permission',
      description: 'Add custom permissions for a user.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user to whom the permission will be added.'
          },
          permission: {
            type: 'string',
            description: 'The permission to be added.'
          },
          delete: {
            type: 'boolean',
            description: 'Indicates whether to delete the permission.'
          }
        },
        required: ['userId', 'permission']
      }
    }
  }
};

export { apiTool };