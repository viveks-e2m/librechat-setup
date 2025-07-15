/**
 * Function to add a new designation.
 *
 * @param {Object} args - Arguments for the new designation.
 * @param {string} args.name - The name of the new designation.
 * @returns {Promise<Object>} - The result of the designation creation.
 */
const executeFunction = async ({ name }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL for the request
    const url = `${host}/designations`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the body for the request
    const body = JSON.stringify({ name });

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
    console.error('Error adding new designation:', error);
    return { error: 'An error occurred while adding the new designation.' };
  }
};

/**
 * Tool configuration for adding a new designation.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_new_designation',
      description: 'Add a new designation.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the new designation.'
          }
        },
        required: ['name']
      }
    }
  }
};

export { apiTool };