/**
 * Function to get suggestion keywords from DataForSEO.
 *
 * @param {Object} args - Arguments for the keyword suggestion.
 * @param {Array<string>} args.keywords - The keywords to get suggestions for.
 * @param {number} args.location_code - The location code for the search.
 * @param {string} args.language_code - The language code for the search.
 * @param {Array<string>} [args.filters] - Filters to apply to the search.
 * @param {Array<string>} [args.order_by] - The order in which to sort the results.
 * @param {number} [args.limit=10] - The maximum number of results to return.
 * @returns {Promise<Object>} - The result of the keyword suggestion request.
 */
const executeFunction = async ({ keywords, location_code, language_code, filters = [], order_by = [], limit = 10 }) => {
  const url = 'https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/live';
  const username = 'access@e2msolutions.com'; // will be provided by the user
  const password = ''; // will be provided by the user

  const body = JSON.stringify([{
    keywords,
    location_code,
    language_code,
    filters,
    order_by,
    limit
  }]);

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      credentials: 'include',
      auth: {
        username,
        password
      }
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
    console.error('Error fetching suggestion keywords:', error);
    return { error: 'An error occurred while fetching suggestion keywords.' };
  }
};

/**
 * Tool configuration for fetching suggestion keywords from DataForSEO.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'suggestion_keywords',
      description: 'Fetch suggestion keywords from DataForSEO.',
      parameters: {
        type: 'object',
        properties: {
          keywords: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The keywords to get suggestions for.'
          },
          location_code: {
            type: 'integer',
            description: 'The location code for the search.'
          },
          language_code: {
            type: 'string',
            description: 'The language code for the search.'
          },
          filters: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'Filters to apply to the search.'
          },
          order_by: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The order in which to sort the results.'
          },
          limit: {
            type: 'integer',
            description: 'The maximum number of results to return.'
          }
        },
        required: ['keywords', 'location_code', 'language_code']
      }
    }
  }
};

export { apiTool };