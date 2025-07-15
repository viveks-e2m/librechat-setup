/**
 * Function to establish a WebSocket connection for collaboration.
 *
 * @param {Object} args - Arguments for the WebSocket connection.
 * @param {string} args.documentId - The ID of the document to collaborate on.
 * @returns {Promise<WebSocket>} - The WebSocket connection object.
 */
const executeFunction = async ({ documentId }) => {
  const baseUrl = 'http://localhost:3000';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  return new Promise((resolve, reject) => {
    const wsUrl = `${baseUrl.replace(/^http/, 'ws')}/collaboration?documentId=${documentId}&token=${token}`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket connection established');
      resolve(socket);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      reject(new Error('WebSocket connection failed'));
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  });
};

/**
 * Tool configuration for establishing a WebSocket connection for collaboration.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'websocket_connection',
      description: 'Establish a WebSocket connection for collaboration on a document.',
      parameters: {
        type: 'object',
        properties: {
          documentId: {
            type: 'string',
            description: 'The ID of the document to collaborate on.'
          }
        },
        required: ['documentId']
      }
    }
  }
};

export { apiTool };