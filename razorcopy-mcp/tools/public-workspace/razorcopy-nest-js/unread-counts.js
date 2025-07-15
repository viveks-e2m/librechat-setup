/**
 * Function to get unread notification counts.
 *
 * @returns {Promise<Object>} - The unread notification count.
 */
const executeFunction = async () => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/notifications/unread-count`;

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
    const data = await response.text();
    return { count: parseInt(data, 10) }; // Assuming the response is a plain text number
  } catch (error) {
    console.error('Error fetching unread counts:', error);
    return { error: 'An error occurred while fetching unread counts.' };
  }
};

/**
 * Tool configuration for getting unread notification counts.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_unread_counts',
      description: 'Get the count of unread notifications.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };