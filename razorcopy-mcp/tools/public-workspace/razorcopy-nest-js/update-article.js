/**
 * Function to update an article in the Razorcopy API.
 *
 * @param {Object} args - Arguments for the article update.
 * @param {string} args.articleId - The ID of the article to update.
 * @param {Object} args.data - The data to update the article with.
 * @param {string} args.data.name - The name of the article.
 * @param {string} args.data.projectId - The project ID associated with the article.
 * @param {Array} [args.data.assigned_members] - The members assigned to the article.
 * @param {string} args.data.description - The description of the article.
 * @param {string} args.data.keywords - The keywords associated with the article.
 * @param {string} args.data.website_url - The website URL related to the article.
 * @param {string} args.data.keyword_volume - The volume of the keyword.
 * @param {string} args.data.keyword_difficulty - The difficulty of the keyword.
 * @param {string} args.data.outline_system_prompt - The outline system prompt ID.
 * @returns {Promise<Object>} - The result of the article update.
 */
const executeFunction = async ({ articleId, data }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    // Construct the URL for the article update
    const url = `${host}/article/${articleId}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error updating article:', error);
    return { error: 'An error occurred while updating the article.' };
  }
};

/**
 * Tool configuration for updating an article in the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_article',
      description: 'Update an article in the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to update.'
          },
          data: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The name of the article.'
              },
              projectId: {
                type: 'string',
                description: 'The project ID associated with the article.'
              },
              assigned_members: {
                type: 'array',
                items: { type: 'string' },
                description: 'The members assigned to the article.'
              },
              description: {
                type: 'string',
                description: 'The description of the article.'
              },
              keywords: {
                type: 'string',
                description: 'The keywords associated with the article.'
              },
              website_url: {
                type: 'string',
                description: 'The website URL related to the article.'
              },
              keyword_volume: {
                type: 'string',
                description: 'The volume of the keyword.'
              },
              keyword_difficulty: {
                type: 'string',
                description: 'The difficulty of the keyword.'
              },
              outline_system_prompt: {
                type: 'string',
                description: 'The outline system prompt ID.'
              }
            },
            required: ['name', 'projectId', 'description', 'keywords', 'website_url', 'keyword_volume', 'keyword_difficulty', 'outline_system_prompt']
          }
        },
        required: ['articleId', 'data']
      }
    }
  }
};

export { apiTool };