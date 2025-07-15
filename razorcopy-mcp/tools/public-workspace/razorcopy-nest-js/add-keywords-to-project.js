/**
 * Function to add keywords to a project in Razorcopy.
 *
 * @param {Object} args - Arguments for adding keywords.
 * @param {string} args.projectId - The ID of the project to which keywords will be added.
 * @param {Array<Object>} args.keywords - The keywords to add, each containing a keyword and a promptTypeId.
 * @returns {Promise<Object>} - The result of the add keywords operation.
 */
const executeFunction = async ({ projectId, keywords }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    const url = `${host}/projects/${projectId}/add-keywords`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const body = JSON.stringify({ keywords });

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding keywords to project:', error);
    return { error: 'An error occurred while adding keywords to the project.' };
  }
};

/**
 * Tool configuration for adding keywords to a project in Razorcopy.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_keywords_to_project',
      description: 'Add keywords to a project in Razorcopy.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project to which keywords will be added.'
          },
          keywords: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                keyword: {
                  type: 'string',
                  description: 'The keyword to add.'
                },
                promptTypeId: {
                  type: 'string',
                  description: 'The ID of the prompt type associated with the keyword.'
                }
              },
              required: ['keyword', 'promptTypeId']
            },
            description: 'The keywords to add.'
          }
        },
        required: ['projectId', 'keywords']
      }
    }
  }
};

export { apiTool };