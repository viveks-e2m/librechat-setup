/**
 * Function to update a guideline in the Razorcopy API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.guidelineId - The ID of the guideline to update.
 * @param {string} args.name - The new name for the guideline.
 * @param {string} args.description - The new description for the guideline.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ guidelineId, name, description }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Construct the URL for the guideline update
    const url = `${host}/guidelines/${guidelineId}`;

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({ name, description });

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
    console.error('Error updating guideline:', error);
    return { error: 'An error occurred while updating the guideline.' };
  }
};

/**
 * Tool configuration for updating a guideline in the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_guideline',
      description: 'Update a guideline in the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          guidelineId: {
            type: 'string',
            description: 'The ID of the guideline to update.'
          },
          name: {
            type: 'string',
            description: 'The new name for the guideline.'
          },
          description: {
            type: 'string',
            description: 'The new description for the guideline.'
          }
        },
        required: ['guidelineId', 'name', 'description']
      }
    }
  }
};

export { apiTool };