/**
 * Function to list all staff members.
 *
 * @returns {Promise<Object>} - The list of staff members.
 */
const executeFunction = async () => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Set up the URL for the request
    const url = `${host}/users/list-staff-members`;

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
    console.error('Error fetching staff members:', error);
    return { error: 'An error occurred while fetching staff members.' };
  }
};

/**
 * Tool configuration for listing all staff members.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_staff_members',
      description: 'Fetch the list of all staff members.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };