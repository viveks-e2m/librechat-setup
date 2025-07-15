/**
 * Function to view a single agency or member by user ID.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.userId - The ID of the user to fetch.
 * @returns {Promise<Object>} - The result of the user fetch operation.
 */
const executeFunction = async ({ userId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with the userId path variable
    const url = `${host}/users/${userId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
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
    console.error('Error fetching user information:', error);
    return { error: 'An error occurred while fetching user information.' };
  }
};

/**
 * Tool configuration for viewing a single agency or member.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'view_single_agency_member',
      description: 'Fetch user information by user ID.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user to fetch.'
          }
        },
        required: ['userId']
      }
    }
  }
};

export { apiTool };