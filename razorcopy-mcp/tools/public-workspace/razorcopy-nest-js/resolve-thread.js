/**
 * Function to resolve a thread in the Razorcopy API.
 *
 * @param {Object} args - Arguments for resolving the thread.
 * @param {string} args.threadId - The ID of the thread to resolve.
 * @returns {Promise<Object>} - The result of the thread resolution.
 */
const executeFunction = async ({ threadId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${host}/comments/00dc6519-464d-45f6-ad92-cc5346e3c1fb/resolve-thread`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ threadId });

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
    console.error('Error resolving thread:', error);
    return { error: 'An error occurred while resolving the thread.' };
  }
};

/**
 * Tool configuration for resolving a thread in the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'resolve_thread',
      description: 'Resolve a thread in the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          threadId: {
            type: 'string',
            description: 'The ID of the thread to resolve.'
          }
        },
        required: ['threadId']
      }
    }
  }
};

export { apiTool };