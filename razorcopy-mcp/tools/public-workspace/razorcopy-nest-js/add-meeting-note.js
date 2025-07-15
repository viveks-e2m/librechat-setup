/**
 * Function to add a meeting note.
 *
 * @param {Object} args - Arguments for the meeting note.
 * @param {string} args.agency_id - The ID of the agency.
 * @param {string} args.agenda - The agenda of the meeting.
 * @param {string} args.meeting_date - The date of the meeting in ISO format.
 * @returns {Promise<Object>} - The result of the meeting note creation.
 */
const executeFunction = async ({ agency_id, agenda, meeting_date }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL for the request
    const url = `${host}/meeting-notes`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the request body
    const body = JSON.stringify({
      agency_id,
      agenda,
      meeting_date
    });

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
    console.error('Error adding meeting note:', error);
    return { error: 'An error occurred while adding the meeting note.' };
  }
};

/**
 * Tool configuration for adding a meeting note.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_meeting_note',
      description: 'Add a meeting note.',
      parameters: {
        type: 'object',
        properties: {
          agency_id: {
            type: 'string',
            description: 'The ID of the agency.'
          },
          agenda: {
            type: 'string',
            description: 'The agenda of the meeting.'
          },
          meeting_date: {
            type: 'string',
            description: 'The date of the meeting in ISO format.'
          }
        },
        required: ['agency_id', 'agenda', 'meeting_date']
      }
    }
  }
};

export { apiTool };