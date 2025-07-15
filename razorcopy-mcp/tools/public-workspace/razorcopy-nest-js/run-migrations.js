/**
 * Function to run migrations on the Razorcopy API.
 *
 * @param {Object} args - Arguments for running migrations.
 * @returns {Promise<Object>} - The result of the migration execution.
 */
const executeFunction = async () => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Set up the URL for the request
    const url = `${host}/run-migrations`;

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
    console.error('Error running migrations:', error);
    return { error: 'An error occurred while running migrations.' };
  }
};

/**
 * Tool configuration for running migrations on the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'run_migrations',
      description: 'Run migrations on the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };