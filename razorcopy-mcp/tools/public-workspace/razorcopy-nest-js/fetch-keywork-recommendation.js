/**
 * Function to fetch keyword recommendations from the Razorcopy API.
 *
 * @param {Object} args - Arguments for the keyword recommendation request.
 * @param {string} args.projectId - The ID of the project for which to fetch keyword recommendations.
 * @param {Array<string>} args.keywords - An array of keywords to use for the recommendation.
 * @returns {Promise<Object>} - The result of the keyword recommendation fetch.
 */
const executeFunction = async ({ projectId, keywords }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    const url = `${host}/projects/fetch-keyword-recommendation`;
    
    const body = JSON.stringify({
      projectId,
      keywords
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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
    console.error('Error fetching keyword recommendations:', error);
    return { error: 'An error occurred while fetching keyword recommendations.' };
  }
};

/**
 * Tool configuration for fetching keyword recommendations from the Razorcopy API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_keyword_recommendation',
      description: 'Fetch keyword recommendations from the Razorcopy API.',
      parameters: {
        type: 'object',
        properties: {
          projectId: {
            type: 'string',
            description: 'The ID of the project for which to fetch keyword recommendations.'
          },
          keywords: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'An array of keywords to use for the recommendation.'
          }
        },
        required: ['projectId', 'keywords']
      }
    }
  }
};

export { apiTool };