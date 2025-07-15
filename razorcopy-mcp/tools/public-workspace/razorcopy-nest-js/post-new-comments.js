/**
 * Function to post new comments to the Razorcopy API.
 *
 * @param {Object} args - Arguments for the comment.
 * @param {string} args.commentId - The ID of the comment thread to post to.
 * @param {string} args.content - The content of the comment to be posted.
 * @returns {Promise<Object>} - The result of the comment posting.
 */
const executeFunction = async ({ commentId, content }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL for posting the comment
    const url = `${host}/comments/${commentId}/comments`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ content });

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
    console.error('Error posting comment:', error);
    return { error: 'An error occurred while posting the comment.' };
  }
};

/**
 * Tool configuration for posting new comments to the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'post_new_comment',
      description: 'Post a new comment to a specific comment thread.',
      parameters: {
        type: 'object',
        properties: {
          commentId: {
            type: 'string',
            description: 'The ID of the comment thread to post to.'
          },
          content: {
            type: 'string',
            description: 'The content of the comment to be posted.'
          }
        },
        required: ['commentId', 'content']
      }
    }
  }
};

export { apiTool };