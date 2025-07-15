/**
 * Function to set task priority for articles based on agency.
 *
 * @param {Object} args - Arguments for setting task priority.
 * @param {Array<string>} args.articleIds - The IDs of the articles.
 * @param {string} args.agencyId - The ID of the agency.
 * @returns {Promise<Object>} - The result of the task priority setting operation.
 */
const executeFunction = async ({ articleIds, agencyId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the request
    const url = `${host}/article/task-priority`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    // Create the request body
    const body = JSON.stringify({ articleIds, agencyId });

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
    console.error('Error setting task priority:', error);
    return { error: 'An error occurred while setting task priority.' };
  }
};

/**
 * Tool configuration for setting task priority for articles.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'set_task_priority',
      description: 'Set task priority for articles based on agency.',
      parameters: {
        type: 'object',
        properties: {
          articleIds: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The IDs of the articles.'
          },
          agencyId: {
            type: 'string',
            description: 'The ID of the agency.'
          }
        },
        required: ['articleIds', 'agencyId']
      }
    }
  }
};

export { apiTool };