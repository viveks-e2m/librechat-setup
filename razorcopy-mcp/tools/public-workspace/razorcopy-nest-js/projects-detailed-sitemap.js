/**
 * Function to fetch the detailed sitemap of a project.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.projectId - The ID of the project for which to fetch the sitemap.
 * @returns {Promise<Object>} - The detailed sitemap of the project.
 */
const executeFunction = async ({ projectId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with the project ID
    const url = `${host}/projects/${projectId}/sitemap`;

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
    console.error('Error fetching project sitemap:', error);
    return { error: 'An error occurred while fetching the project sitemap.' };
  }
};

/**
 * Tool configuration for fetching the detailed sitemap of a project.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_project_sitemap',
      description: 'Fetch the detailed sitemap of a project.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project for which to fetch the sitemap.'
          }
        },
        required: ['projectId']
      }
    }
  }
};

export { apiTool };