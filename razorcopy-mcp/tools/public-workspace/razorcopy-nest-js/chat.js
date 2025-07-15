/**
 * Function to send a chat message to the Razorcopy API.
 *
 * @param {Object} args - Arguments for the chat message.
 * @param {Array} args.messages - An array of message objects containing role and content.
 * @returns {Promise<Object>} - The response from the chat API.
 */
const executeFunction = async ({ messages }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Set up the request body
    const body = JSON.stringify(messages);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${host}/openai/chat`, {
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
    console.error('Error sending chat message:', error);
    return { error: 'An error occurred while sending the chat message.' };
  }
};

/**
 * Tool configuration for sending chat messages to the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_chat_message',
      description: 'Send a chat message to the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          messages: {
            type: 'array',
            description: 'An array of message objects containing role and content.',
            items: {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                  description: 'The role of the message sender (e.g., user, system).'
                },
                content: {
                  type: 'string',
                  description: 'The content of the message.'
                }
              },
              required: ['role', 'content']
            }
          }
        },
        required: ['messages']
      }
    }
  }
};

export { apiTool };