/**
 * Function to create a thread in BlockNote.
 *
 * @param {Object} args - Arguments for creating a thread.
 * @param {string} args.blockId - The ID of the block where the thread will be created.
 * @param {Object} args.selection - The selection object containing the range.
 * @param {number} args.selection.from - The starting index of the selection.
 * @param {number} args.selection.to - The ending index of the selection.
 * @returns {Promise<Object>} - The result of the thread creation.
 */
const executeFunction = async ({ blockId, selection }) => {
  const baseUrl = 'http://localhost:3000';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/comments/doc123/threads`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      blockId,
      selection
    });

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
    console.error('Error creating thread:', error);
    return { error: 'An error occurred while creating the thread.' };
  }
};

/**
 * Tool configuration for creating a thread in BlockNote.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_thread',
      description: 'Create a thread in BlockNote.',
      parameters: {
        type: 'object',
        properties: {
          blockId: {
            type: 'string',
            description: 'The ID of the block where the thread will be created.'
          },
          selection: {
            type: 'object',
            properties: {
              from: {
                type: 'integer',
                description: 'The starting index of the selection.'
              },
              to: {
                type: 'integer',
                description: 'The ending index of the selection.'
              }
            },
            required: ['from', 'to']
          }
        },
        required: ['blockId', 'selection']
      }
    }
  }
};

export { apiTool };