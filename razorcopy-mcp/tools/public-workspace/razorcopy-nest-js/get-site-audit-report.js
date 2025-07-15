/**
 * Function to get the site audit report for a specific project.
 *
 * @param {Object} args - Arguments for the site audit report.
 * @param {string} args.projecId - The ID of the project for which to retrieve the site audit report.
 * @returns {Promise<Object>} - The result of the site audit report request.
 */
const executeFunction = async ({ projecId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with the project ID
    const url = `${host}/projects/${projecId}/site-audit/report`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
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
    console.error('Error getting site audit report:', error);
    return { error: 'An error occurred while getting the site audit report.' };
  }
};

/**
 * Tool configuration for getting site audit report.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_site_audit_report',
      description: 'Get the site audit report for a specific project.',
      parameters: {
        type: 'object',
        properties: {
          projecId: {
            type: 'string',
            description: 'The ID of the project for which to retrieve the site audit report.'
          }
        },
        required: ['projecId']
      }
    }
  }
};

export { apiTool };