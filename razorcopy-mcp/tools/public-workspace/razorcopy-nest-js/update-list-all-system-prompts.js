/**
 * Function to update a system prompt.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.articleId - The ID of the article to update.
 * @param {Object} args.data - The data to update the system prompt.
 * @param {string} args.data.type - The type of the prompt.
 * @param {string} args.data.name - The name of the prompt.
 * @param {string} args.data.description - The description of the prompt.
 * @param {boolean} args.data.is_default - Whether the prompt is the default one.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ articleId, data }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL with the article ID
    const url = `${host}/system-prompts/${articleId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating system prompt:', error);
    return { error: 'An error occurred while updating the system prompt.' };
  }
};

/**
 * Tool configuration for updating a system prompt.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_system_prompt',
      description: 'Update a system prompt by its ID.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to update.'
          },
          data: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                description: 'The type of the prompt.'
              },
              name: {
                type: 'string',
                description: 'The name of the prompt.'
              },
              description: {
                type: 'string',
                description: 'The description of the prompt.'
              },
              is_default: {
                type: 'boolean',
                description: 'Whether the prompt is the default one.'
              }
            },
            required: ['type', 'name', 'description', 'is_default']
          }
        },
        required: ['articleId', 'data']
      }
    }
  }
};

export { apiTool };