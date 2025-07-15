/**
 * Function to delete a role from the Razorcopy API.
 *
 * @param {string} roleId - The ID of the role to be deleted.
 * @returns {Promise<Object>} - The result of the delete operation.
 */
const executeFunction = async (roleId) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the DELETE request
    const url = `${host}/roles/${roleId}`;

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
    console.error('Error deleting role:', error);
    return { error: 'An error occurred while deleting the role.' };
  }
};

/**
 * Tool configuration for deleting a role from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_role',
      description: 'Delete a role from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          roleId: {
            type: 'string',
            description: 'The ID of the role to be deleted.'
          }
        },
        required: ['roleId']
      }
    }
  }
};

export { apiTool };