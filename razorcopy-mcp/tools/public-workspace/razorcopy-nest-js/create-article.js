/**
 * Function to create an article in Razorcopy.
 *
 * @param {Object} args - Arguments for creating an article.
 * @param {string} args.name - The name of the article.
 * @param {string} args.project_id - The ID of the project the article belongs to.
 * @param {string} args.status - The status of the article.
 * @param {Array<string>} args.assigned_members - List of member IDs assigned to the article.
 * @param {Array<string>} [args.assign_followers] - List of follower IDs for the article.
 * @param {string} args.description - The description of the article.
 * @param {string} args.keywords - The primary keywords for the article.
 * @param {Array<string>} [args.secondary_keywords] - List of secondary keywords for the article.
 * @param {string} args.website_url - The website URL related to the article.
 * @param {string} args.keyword_volume - The volume of the primary keyword.
 * @param {string} args.keyword_difficulty - The difficulty level of the primary keyword.
 * @returns {Promise<Object>} - The result of the article creation.
 */
const executeFunction = async ({ name, project_id, status, assigned_members, assign_followers = [], description, keywords, secondary_keywords = [], website_url, keyword_volume, keyword_difficulty }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  const articleData = {
    name,
    project_id,
    status,
    assigned_members,
    assign_followers,
    description,
    keywords,
    secondary_keywords,
    website_url,
    keyword_volume,
    keyword_difficulty
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${host}/article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(articleData)
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
    console.error('Error creating article:', error);
    return { error: 'An error occurred while creating the article.' };
  }
};

/**
 * Tool configuration for creating an article in Razorcopy.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_article',
      description: 'Create an article in Razorcopy.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the article.'
          },
          project_id: {
            type: 'string',
            description: 'The ID of the project the article belongs to.'
          },
          status: {
            type: 'string',
            description: 'The status of the article.'
          },
          assigned_members: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of member IDs assigned to the article.'
          },
          assign_followers: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of follower IDs for the article.'
          },
          description: {
            type: 'string',
            description: 'The description of the article.'
          },
          keywords: {
            type: 'string',
            description: 'The primary keywords for the article.'
          },
          secondary_keywords: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of secondary keywords for the article.'
          },
          website_url: {
            type: 'string',
            description: 'The website URL related to the article.'
          },
          keyword_volume: {
            type: 'string',
            description: 'The volume of the primary keyword.'
          },
          keyword_difficulty: {
            type: 'string',
            description: 'The difficulty level of the primary keyword.'
          }
        },
        required: ['name', 'project_id', 'status', 'assigned_members', 'description', 'keywords', 'website_url', 'keyword_volume', 'keyword_difficulty']
      }
    }
  }
};

export { apiTool };