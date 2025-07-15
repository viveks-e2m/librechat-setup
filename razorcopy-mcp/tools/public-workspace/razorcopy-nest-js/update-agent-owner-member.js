/**
 * Function to update an agent's owner/member information.
 *
 * @param {Object} args - The arguments for updating the agent.
 * @param {string} args.firstname - The first name of the agent.
 * @param {string} args.lastname - The last name of the agent.
 * @param {string} [args.timezone] - The timezone of the agent.
 * @param {string} [args.agency_name] - The name of the agency.
 * @param {Array<string>} [args.managed_by] - An array of IDs representing who manages the agent.
 * @returns {Promise<Object>} - The response from the API after updating the agent.
 */
const executeFunction = async ({ firstname, lastname, timezone, agency_name, managed_by }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  const userId = '14b885da-cc0b-48c7-b900-e8ebf12b670e'; // example user ID, can be parameterized if needed

  try {
    // Construct the URL for the PATCH request
    const url = `${host}/users/${userId}`;

    // Prepare the request body
    const body = {
      firstname,
      lastname,
      timezone,
      agency_name,
      managed_by
    };

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error updating agent owner/member:', error);
    return { error: 'An error occurred while updating the agent owner/member.' };
  }
};

/**
 * Tool configuration for updating an agent's owner/member information.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_agent_owner_member',
      description: 'Update an agent\'s owner/member information.',
      parameters: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
            description: 'The first name of the agent.'
          },
          lastname: {
            type: 'string',
            description: 'The last name of the agent.'
          },
          timezone: {
            type: 'string',
            description: 'The timezone of the agent.'
          },
          agency_name: {
            type: 'string',
            description: 'The name of the agency.'
          },
          managed_by: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of IDs representing who manages the agent.'
          }
        },
        required: ['firstname', 'lastname']
      }
    }
  }
};

export { apiTool };