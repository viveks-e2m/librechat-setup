/**
 * Function to list all article statuses.
 *
 * @returns {Promise<Object>} - The result of the status list.
 */
const executeFunction = async () => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Set up the URL for the request
    const url = `${host}/article/topic-status`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
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
    console.error('Error listing article statuses:', error);
    return { error: 'An error occurred while listing article statuses.' };
  }
};

/**
 * Tool configuration for listing article statuses.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_article_statuses',
      description: 'List all article statuses.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };