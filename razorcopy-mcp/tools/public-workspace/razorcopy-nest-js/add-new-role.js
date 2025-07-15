/**
 * Function to add a new role in the Razorcopy application.
 *
 * @param {Object} args - Arguments for the new role.
 * @param {string} args.name - The name of the new role.
 * @param {string} args.code - The code for the new role.
 * @param {Array<string>} args.permissions - The permissions associated with the new role.
 * @returns {Promise<Object>} - The result of the role creation.
 */
const executeFunction = async ({ name, code, permissions }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL for the API request
    const url = `${host}/roles`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({
      name,
      code,
      permissions,
    });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
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
    console.error('Error adding new role:', error);
    return { error: 'An error occurred while adding the new role.' };
  }
};

/**
 * Tool configuration for adding a new role in the Razorcopy application.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_new_role',
      description: 'Add a new role in the Razorcopy application.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the new role.'
          },
          code: {
            type: 'string',
            description: 'The code for the new role.'
          },
          permissions: {
            type: 'array',
            items: {
              type: 'string',
            },
            description: 'The permissions associated with the new role.'
          }
        },
        required: ['name', 'code', 'permissions']
      }
    }
  }
};

export { apiTool };