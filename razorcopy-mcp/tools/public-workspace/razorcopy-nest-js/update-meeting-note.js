/**
 * Function to update a meeting note.
 *
 * @param {Object} args - Arguments for updating the meeting note.
 * @param {string} args.meetingId - The ID of the meeting note to update.
 * @param {string} args.agenda - The new agenda for the meeting note.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ meetingId, agenda }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${host}/meeting-notes/${meetingId}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ agenda });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error updating meeting note:', error);
    return { error: 'An error occurred while updating the meeting note.' };
  }
};

/**
 * Tool configuration for updating a meeting note.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_meeting_note',
      description: 'Update a meeting note with a new agenda.',
      parameters: {
        type: 'object',
        properties: {
          meetingId: {
            type: 'string',
            description: 'The ID of the meeting note to update.'
          },
          agenda: {
            type: 'string',
            description: 'The new agenda for the meeting note.'
          }
        },
        required: ['meetingId', 'agenda']
      }
    }
  }
};

export { apiTool };