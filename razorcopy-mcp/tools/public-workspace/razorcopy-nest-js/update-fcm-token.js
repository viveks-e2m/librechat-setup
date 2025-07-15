/**
 * Function to update the FCM token.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.fcm_token - The FCM token to be updated.
 * @returns {Promise<Object>} - The result of the FCM token update.
 */
const executeFunction = async ({ fcm_token }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the request
    const url = `${host}/auth/update-fcm-token`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ fcm_token });

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
    console.error('Error updating FCM token:', error);
    return { error: 'An error occurred while updating the FCM token.' };
  }
};

/**
 * Tool configuration for updating the FCM token.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_fcm_token',
      description: 'Update the FCM token.',
      parameters: {
        type: 'object',
        properties: {
          fcm_token: {
            type: 'string',
            description: 'The FCM token to be updated.'
          }
        },
        required: ['fcm_token']
      }
    }
  }
};

export { apiTool };