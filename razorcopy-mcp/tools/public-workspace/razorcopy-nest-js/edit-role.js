/**
 * Function to edit a role in the Razorcopy API.
 *
 * @param {Object} args - Arguments for the role edit.
 * @param {string} args.roleId - The ID of the role to be edited.
 * @param {string} args.code - The new code for the role.
 * @param {Array<string>} args.permissions - The permissions to assign to the role.
 * @returns {Promise<Object>} - The result of the role edit operation.
 */
const executeFunction = async ({ roleId, code, permissions }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  const url = `${host}/roles/${roleId}`;
  const body = JSON.stringify({ code, permissions });

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error editing role:', error);
    return { error: 'An error occurred while editing the role.' };
  }
};

/**
 * Tool configuration for editing a role in the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'edit_role',
      description: 'Edit a role in the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          roleId: {
            type: 'string',
            description: 'The ID of the role to be edited.'
          },
          code: {
            type: 'string',
            description: 'The new code for the role.'
          },
          permissions: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The permissions to assign to the role.'
          }
        },
        required: ['roleId', 'code', 'permissions']
      }
    }
  }
};

export { apiTool };