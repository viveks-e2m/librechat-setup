/**
 * Function to update the designation in the Razorcopy API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.id - The ID of the designation to update.
 * @param {string} args.name - The new name for the designation.
 * @returns {Promise<Object>} - The result of the designation update.
 */
const executeFunction = async ({ id, name }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the designation update
    const url = `${host}/designations/${id}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({ name });

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
    console.error('Error updating designation:', error);
    return { error: 'An error occurred while updating the designation.' };
  }
};

/**
 * Tool configuration for updating designations in the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_designation',
      description: 'Update a designation in the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the designation to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the designation.'
          }
        },
        required: ['id', 'name']
      }
    }
  }
};

export { apiTool };