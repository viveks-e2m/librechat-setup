/**
 * Function to bulk assign article members.
 *
 * @param {Object} args - Arguments for the bulk assignment.
 * @param {Array<string>} args.articleIds - The IDs of the articles to assign members to.
 * @param {Array<string>} args.assigned_members - The IDs of the members to assign.
 * @param {Array<string>} args.remove_assigned_members - The IDs of the members to remove from assignment.
 * @param {string} args.status - The status of the assignment.
 * @returns {Promise<Object>} - The result of the bulk assignment operation.
 */
const executeFunction = async ({ articleIds, assigned_members, remove_assigned_members, status }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  const url = `${host}/article/bulk-assign`;

  const body = {
    articleIds,
    assigned_members,
    remove_assigned_members,
    status
  };

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
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
    console.error('Error during bulk assignment:', error);
    return { error: 'An error occurred while performing the bulk assignment.' };
  }
};

/**
 * Tool configuration for bulk assigning article members.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'bulk_assign_article_members',
      description: 'Bulk assign members to articles.',
      parameters: {
        type: 'object',
        properties: {
          articleIds: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The IDs of the articles to assign members to.'
          },
          assigned_members: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The IDs of the members to assign.'
          },
          remove_assigned_members: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The IDs of the members to remove from assignment.'
          },
          status: {
            type: 'string',
            description: 'The status of the assignment.'
          }
        },
        required: ['articleIds', 'assigned_members', 'remove_assigned_members', 'status']
      }
    }
  }
};

export { apiTool };