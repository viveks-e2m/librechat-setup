/**
 * Function to start a site audit for a project.
 *
 * @param {Object} args - Arguments for the site audit.
 * @param {string} args.projecId - The ID of the project to start the site audit for.
 * @returns {Promise<Object>} - The result of the site audit request.
 */
const executeFunction = async ({ projecId }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL for the site audit
    const url = `${host}/projects/${projecId}/site-audit`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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
    console.error('Error starting site audit:', error);
    return { error: 'An error occurred while starting the site audit.' };
  }
};

/**
 * Tool configuration for starting a site audit.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'start_site_audit',
      description: 'Start a site audit for a specified project.',
      parameters: {
        type: 'object',
        properties: {
          projecId: {
            type: 'string',
            description: 'The ID of the project to start the site audit for.'
          }
        },
        required: ['projecId']
      }
    }
  }
};

export { apiTool };