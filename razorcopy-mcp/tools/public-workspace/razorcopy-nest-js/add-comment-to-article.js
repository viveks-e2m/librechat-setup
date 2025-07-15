/**
 * Function to add a comment to an article.
 *
 * @param {Object} args - Arguments for adding a comment.
 * @param {string} args.articleId - The ID of the article to which the comment is being added.
 * @param {string} args.comment - The comment text to be added.
 * @param {string} [args.selectedText] - The selected text in the article (optional).
 * @returns {Promise<Object>} - The result of the comment addition.
 */
const executeFunction = async ({ articleId, comment, selectedText }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${host}/comments/${articleId}/comment`;

    // Prepare the request body
    const body = JSON.stringify({
      comment,
      selectedText
    });

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
    console.error('Error adding comment:', error);
    return { error: 'An error occurred while adding the comment.' };
  }
};

/**
 * Tool configuration for adding a comment to an article.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_comment',
      description: 'Add a comment to an article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to which the comment is being added.'
          },
          comment: {
            type: 'string',
            description: 'The comment text to be added.'
          },
          selectedText: {
            type: 'string',
            description: 'The selected text in the article (optional).'
          }
        },
        required: ['articleId', 'comment']
      }
    }
  }
};

export { apiTool };