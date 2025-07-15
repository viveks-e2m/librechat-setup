/**
 * Function to mark all notifications as read.
 *
 * @returns {Promise<Object>} - The result of marking notifications as read.
 */
const executeFunction = async () => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(`${host}/notifications/mark-all-as-read`, {
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
    console.error('Error marking notifications as read:', error);
    return { error: 'An error occurred while marking notifications as read.' };
  }
};

/**
 * Tool configuration for marking notifications as read.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'mark_all_as_read',
      description: 'Mark all notifications as read.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };