/**
 * Function to add a new prompt type.
 *
 * @param {Object} args - The prompt type details.
 * @param {string} args.name - The name of the prompt type.
 * @param {string} args.titlePrompt - The ID of the title prompt.
 * @param {string} args.outlinePrompt - The ID of the outline prompt.
 * @param {string} args.articlePrompt - The ID of the article prompt.
 * @returns {Promise<Object>} - The response from the API after creating the prompt type.
 */
const executeFunction = async ({ name, titlePrompt, outlinePrompt, articlePrompt }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  const url = `${host}/prompt-types`;
  const body = JSON.stringify({
    name,
    titlePrompt,
    outlinePrompt,
    articlePrompt
  });

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

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
    console.error('Error adding new prompt type:', error);
    return { error: 'An error occurred while adding the new prompt type.' };
  }
};

/**
 * Tool configuration for adding a new prompt type.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_prompt_type',
      description: 'Add a new prompt type.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the prompt type.'
          },
          titlePrompt: {
            type: 'string',
            description: 'The ID of the title prompt.'
          },
          outlinePrompt: {
            type: 'string',
            description: 'The ID of the outline prompt.'
          },
          articlePrompt: {
            type: 'string',
            description: 'The ID of the article prompt.'
          }
        },
        required: ['name', 'titlePrompt', 'outlinePrompt', 'articlePrompt']
      }
    }
  }
};

export { apiTool };