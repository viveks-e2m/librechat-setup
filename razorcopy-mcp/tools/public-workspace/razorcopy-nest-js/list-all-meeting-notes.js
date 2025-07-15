/**
 * Function to list all meeting notes.
 *
 * @returns {Promise<Object>} - The result of the meeting notes retrieval.
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
    const response = await fetch(`${host}/meeting-notes`, {
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
    console.error('Error listing meeting notes:', error);
    return { error: 'An error occurred while listing meeting notes.' };
  }
};

/**
 * Tool configuration for listing all meeting notes.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_all_meeting_notes',
      description: 'List all meeting notes.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };