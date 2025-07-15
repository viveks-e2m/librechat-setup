/**
 * Function to request a collaboration token from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the token request.
 * @param {string} args.docId - The document ID for which the collaboration token is requested.
 * @returns {Promise<Object>} - The response from the API.
 */
const executeFunction = async ({ docId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/collab/token`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({ docId });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error requesting collaboration token:', error);
    return { error: 'An error occurred while requesting the collaboration token.' };
  }
};

/**
 * Tool configuration for requesting a collaboration token from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'request_collab_token',
      description: 'Request a collaboration token for a specific document.',
      parameters: {
        type: 'object',
        properties: {
          docId: {
            type: 'string',
            description: 'The document ID for which the collaboration token is requested.'
          }
        },
        required: ['docId']
      }
    }
  }
};

export { apiTool };