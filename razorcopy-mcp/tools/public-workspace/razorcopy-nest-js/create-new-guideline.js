/**
 * Function to create a new guideline.
 *
 * @param {Object} args - Arguments for creating a guideline.
 * @param {string} args.name - The name of the guideline.
 * @param {string} args.description - The description of the guideline.
 * @returns {Promise<Object>} - The result of the guideline creation.
 */
const executeFunction = async ({ name, description }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${host}/guidelines`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Create the request body
    const body = JSON.stringify({ name, description });

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
    console.error('Error creating guideline:', error);
    return { error: 'An error occurred while creating the guideline.' };
  }
};

/**
 * Tool configuration for creating a new guideline.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_guideline',
      description: 'Create a new guideline.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the guideline.'
          },
          description: {
            type: 'string',
            description: 'The description of the guideline.'
          }
        },
        required: ['name', 'description']
      }
    }
  }
};

export { apiTool };