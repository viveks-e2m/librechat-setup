/**
 * Function to create a new comment thread.
 *
 * @param {Object} args - Arguments for creating a comment thread.
 * @param {string} args.blockId - The ID of the block to which the comment is associated.
 * @param {string} args.text - The text content of the comment.
 * @returns {Promise<Object>} - The result of the comment thread creation.
 */
const executeFunction = async ({ blockId, text }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  const url = `${host}/comments/${blockId}/threads`;

  const body = {
    text: [
      {
        id: blockId,
        type: 'paragraph',
        props: {},
        content: [
          {
            type: 'text',
            text: text,
            styles: {}
          }
        ],
        children: []
      }
    ],
    type: 'comment',
    metadata: {
      blockId: blockId,
      markerPosition: {
        from: 24,
        to: 41
      }
    }
  };

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
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
    console.error('Error creating comment thread:', error);
    return { error: 'An error occurred while creating the comment thread.' };
  }
};

/**
 * Tool configuration for creating a comment thread.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_comment_thread',
      description: 'Create a new comment thread.',
      parameters: {
        type: 'object',
        properties: {
          blockId: {
            type: 'string',
            description: 'The ID of the block to which the comment is associated.'
          },
          text: {
            type: 'string',
            description: 'The text content of the comment.'
          }
        },
        required: ['blockId', 'text']
      }
    }
  }
};

export { apiTool };