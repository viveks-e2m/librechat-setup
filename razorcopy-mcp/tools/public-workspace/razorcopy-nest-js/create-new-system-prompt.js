/**
 * Function to create a new system prompt.
 *
 * @param {Object} args - Arguments for creating a system prompt.
 * @param {string} args.type - The type of the prompt (e.g., topic_title, topic_outline, article).
 * @param {string} args.name - The name of the prompt.
 * @param {string} args.description - The description of the prompt.
 * @returns {Promise<Object>} - The result of the system prompt creation.
 */
const executeFunction = async ({ type, name, description }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL for the request
    const url = `${host}/system-prompts`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({
      type,
      name,
      description
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
    console.error('Error creating system prompt:', error);
    return { error: 'An error occurred while creating the system prompt.' };
  }
};

/**
 * Tool configuration for creating a new system prompt.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_system_prompt',
      description: 'Create a new system prompt.',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            description: 'The type of the prompt (e.g., topic_title, topic_outline, article).'
          },
          name: {
            type: 'string',
            description: 'The name of the prompt.'
          },
          description: {
            type: 'string',
            description: 'The description of the prompt.'
          }
        },
        required: ['type', 'name']
      }
    }
  }
};

export { apiTool };