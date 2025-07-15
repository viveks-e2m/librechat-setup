/**
 * Function to mark a notification as read.
 *
 * @param {Object} args - Arguments for marking the notification as read.
 * @param {string} args.notificationId - The ID of the notification to mark as read.
 * @returns {Promise<Object>} - The result of the mark as read operation.
 */
const executeFunction = async ({ notificationId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with the notification ID
    const url = `${host}/notifications/${notificationId}/mark-as-read`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error marking notification as read:', error);
    return { error: 'An error occurred while marking the notification as read.' };
  }
};

/**
 * Tool configuration for marking a notification as read.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'mark_as_read',
      description: 'Mark a notification as read.',
      parameters: {
        type: 'object',
        properties: {
          notificationId: {
            type: 'string',
            description: 'The ID of the notification to mark as read.'
          }
        },
        required: ['notificationId']
      }
    }
  }
};

export { apiTool };