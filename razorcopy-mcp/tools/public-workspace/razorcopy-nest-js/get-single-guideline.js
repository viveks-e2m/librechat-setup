/**
 * Function to get a single guideline from the Razorcopy API.
 *
 * @param {string} guidelineId - The ID of the guideline to retrieve.
 * @returns {Promise<Object>} - The result of the guideline retrieval.
 */
const executeFunction = async (guidelineId) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/guidelines/${guidelineId}`;

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
    console.error('Error retrieving guideline:', error);
    return { error: 'An error occurred while retrieving the guideline.' };
  }
};

/**
 * Tool configuration for getting a single guideline from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_single_guideline',
      description: 'Retrieve a single guideline from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          guidelineId: {
            type: 'string',
            description: 'The ID of the guideline to retrieve.'
          }
        },
        required: ['guidelineId']
      }
    }
  }
};

export { apiTool };