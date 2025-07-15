/**
 * Function to get all comments from the Razorcopy API.
 *
 * @param {string} commentId - The ID of the comment to retrieve.
 * @returns {Promise<Array>} - The list of comments for the specified comment ID.
 */
const executeFunction = async (commentId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/comments/${commentId}/comments`;

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
    console.error('Error getting comments:', error);
    return { error: 'An error occurred while getting comments.' };
  }
};

/**
 * Tool configuration for getting all comments from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_all_comments',
      description: 'Get all comments from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          commentId: {
            type: 'string',
            description: 'The ID of the comment to retrieve.'
          }
        },
        required: ['commentId']
      }
    }
  }
};

export { apiTool };