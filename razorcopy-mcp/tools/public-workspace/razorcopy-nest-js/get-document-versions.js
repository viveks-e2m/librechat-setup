/**
 * Function to get document versions from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.articleId - The ID of the article to fetch versions for.
 * @returns {Promise<Object>} - The result of the document versions fetch.
 */
const executeFunction = async ({ articleId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with the article ID
    const url = `${host}/article-documents/${articleId}/versions`;

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
    console.error('Error fetching document versions:', error);
    return { error: 'An error occurred while fetching document versions.' };
  }
};

/**
 * Tool configuration for getting document versions from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_document_versions',
      description: 'Fetch document versions for a specific article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to fetch versions for.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };