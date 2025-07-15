/**
 * Function to select generated AI content for a specific article.
 *
 * @param {Object} args - Arguments for selecting AI content.
 * @param {string} args.articleId - The ID of the article to select AI content for.
 * @param {string} args.selected_content - The type of content to select (e.g., "open_ai").
 * @returns {Promise<Object>} - The result of the AI content selection.
 */
const executeFunction = async ({ articleId, selected_content }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL with the article ID
    const url = `${host}/article/${articleId}/select-ai-content`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the request body
    const body = JSON.stringify({ selected_content });

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
    console.error('Error selecting AI content:', error);
    return { error: 'An error occurred while selecting AI content.' };
  }
};

/**
 * Tool configuration for selecting generated AI content for an article.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'select_generated_ai_content',
      description: 'Select generated AI content for a specific article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to select AI content for.'
          },
          selected_content: {
            type: 'string',
            description: 'The type of content to select (e.g., "open_ai").'
          }
        },
        required: ['articleId', 'selected_content']
      }
    }
  }
};

export { apiTool };