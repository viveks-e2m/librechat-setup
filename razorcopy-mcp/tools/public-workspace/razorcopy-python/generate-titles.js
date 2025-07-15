import dotenv from 'dotenv';
dotenv.config();
/**
 * Function to generate titles based on provided keywords.
 *
 * @param {Object} args - Arguments for generating titles.
 * @param {string} args.ProjectId - The project ID for which titles are to be generated.
 * @param {Array<Object>} args.Keywords - An array of keyword objects containing keyword and promptTypeId.
 * @returns {Promise<Object>} - The result of the title generation.
 */
const executeFunction = async ({ ProjectId, Keywords }) => {
  const baseUrl = process.env.PYTHON_BASE_URL; // will be provided by the user
  const url = `${baseUrl}/get-titles`;
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  try {
    // Prepare the request body
    const body = JSON.stringify({ ProjectId, Keywords });

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
      method: 'POST',
      headers,
      body,
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating titles:', error);
    return { error: 'An error occurred while generating titles.' };
  }
};

/**
 * Tool configuration for generating titles based on keywords.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'generate_titles',
      description: 'Generate titles based on provided keywords.',
      parameters: {
        type: 'object',
        properties: {
          ProjectId: {
            type: 'string',
            description: 'The project ID for which titles are to be generated.'
          },
          Keywords: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                keyword: {
                  type: 'string',
                  description: 'The keyword for title generation.'
                },
                promptTypeId: {
                  type: 'string',
                  description: 'The ID of the prompt type associated with the keyword.'
                }
              },
              required: ['keyword', 'promptTypeId']
            },
            description: 'An array of keyword objects containing keyword and promptTypeId.'
          }
        },
        required: ['ProjectId', 'Keywords']
      }
    }
  }
};

export { apiTool };