/**
 * Function to retrieve keyword metrics from DataForSEO.
 *
 * @param {Object} args - Arguments for the keyword metrics request.
 * @param {string} args.keywords - The keywords to retrieve metrics for.
 * @param {string} args.language_name - The language of the keywords.
 * @param {string} args.location_name - The location for the keyword metrics.
 * @returns {Promise<Object>} - The result of the keyword metrics request.
 */
const executeFunction = async ({ keywords, language_name, location_name }) => {
  const url = 'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live';
  const username = 'access@e2msolutions.com'; // will be provided by the user
  const password = ''; // will be provided by the user

  try {
    // Prepare the request body
    const body = JSON.stringify([{ keywords, language_name, location_name }]);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    };

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
    console.error('Error retrieving keyword metrics:', error);
    return { error: 'An error occurred while retrieving keyword metrics.' };
  }
};

/**
 * Tool configuration for retrieving keyword metrics from DataForSEO.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_keyword_metrics',
      description: 'Retrieve keyword metrics from DataForSEO.',
      parameters: {
        type: 'object',
        properties: {
          keywords: {
            type: 'string',
            description: 'The keywords to retrieve metrics for.'
          },
          language_name: {
            type: 'string',
            description: 'The language of the keywords.'
          },
          location_name: {
            type: 'string',
            description: 'The location for the keyword metrics.'
          }
        },
        required: ['keywords', 'language_name', 'location_name']
      }
    }
  }
};

export { apiTool };