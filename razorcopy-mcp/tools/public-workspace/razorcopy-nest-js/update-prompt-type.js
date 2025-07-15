/**
 * Function to update a prompt type in the Razorcopy API.
 *
 * @param {Object} args - Arguments for updating the prompt type.
 * @param {string} args.id - The ID of the prompt type to update.
 * @param {string} args.name - The new name for the prompt type.
 * @param {string} args.titlePrompt - The ID of the title prompt.
 * @param {string} args.outlinePrompt - The ID of the outline prompt.
 * @param {string} args.articlePrompt - The ID of the article prompt.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ id, name, titlePrompt, outlinePrompt, articlePrompt }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${host}/prompt-types/${id}`;

    // Prepare the request body
    const body = JSON.stringify({
      name,
      titlePrompt,
      outlinePrompt,
      articlePrompt
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
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
    console.error('Error updating prompt type:', error);
    return { error: 'An error occurred while updating the prompt type.' };
  }
};

/**
 * Tool configuration for updating a prompt type in the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_prompt_type',
      description: 'Update a prompt type in the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the prompt type to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the prompt type.'
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
        required: ['id', 'name', 'titlePrompt', 'outlinePrompt', 'articlePrompt']
      }
    }
  }
};

export { apiTool };