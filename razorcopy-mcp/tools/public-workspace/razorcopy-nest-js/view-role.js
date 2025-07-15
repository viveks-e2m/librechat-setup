/**
 * Function to view a role from the Razorcopy API.
 *
 * @param {string} roleId - The ID of the role to view.
 * @returns {Promise<Object>} - The result of the role view request.
 */
const executeFunction = async (roleId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/roles/${roleId}`;

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
    console.error('Error viewing role:', error);
    return { error: 'An error occurred while viewing the role.' };
  }
};

/**
 * Tool configuration for viewing a role in the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'view_role',
      description: 'View a specific role by its ID.',
      parameters: {
        type: 'object',
        properties: {
          roleId: {
            type: 'string',
            description: 'The ID of the role to view.'
          }
        },
        required: ['roleId']
      }
    }
  }
};

export { apiTool };