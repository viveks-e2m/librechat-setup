/**
 * Function to get the article diff percentage from Razorcopy.
 *
 * @returns {Promise<Object>} - The result of the article diff percentage request.
 */
const executeFunction = async () => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/dashboard/article-text-diff`;

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
    console.error('Error fetching article diff percentage:', error);
    return { error: 'An error occurred while fetching article diff percentage.' };
  }
};

/**
 * Tool configuration for getting article diff percentage from Razorcopy.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_article_diff_percentage',
      description: 'Get the article diff percentage from Razorcopy.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };