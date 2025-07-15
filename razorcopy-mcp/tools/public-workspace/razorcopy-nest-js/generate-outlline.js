/**
 * Function to generate an outline for an article.
 *
 * @param {Object} args - Arguments for generating the outline.
 * @param {string} args.articleId - The ID of the article for which to generate the outline.
 * @param {boolean} [args.refresh=true] - Whether to refresh the outline.
 * @returns {Promise<Object>} - The result of the outline generation.
 */
const executeFunction = async ({ articleId, refresh = true }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  try {
    // Construct the URL with path and query parameters
    const url = new URL(`${host}/article/${articleId}/outline`);
    url.searchParams.append('refresh', refresh.toString());

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
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
    console.error('Error generating outline:', error);
    return { error: 'An error occurred while generating the outline.' };
  }
};

/**
 * Tool configuration for generating an article outline.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_outline',
      description: 'Generate an outline for an article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article for which to generate the outline.'
          },
          refresh: {
            type: 'boolean',
            description: 'Whether to refresh the outline.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };