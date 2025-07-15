import dotenv from 'dotenv';
dotenv.config();
/**
 * Function to fetch sitemap data from a specified URL.
 *
 * @param {Object} args - Arguments for the fetch request.
 * @param {string} args.url - The URL to fetch the sitemap data from.
 * @returns {Promise<Object>} - The response data from the fetch request.
 */
const executeFunction = async ({ url }) => {
  const pythonHost = process.env.PYTHON_HOST;  // will be provided by the user
  try {
    // Set up the request body
    const body = JSON.stringify({ url });

    // Perform the fetch request
    const response = await fetch(`${pythonHost}/sitemap`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
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
    console.error('Error fetching sitemap data:', error);
    return { error: 'An error occurred while fetching sitemap data.' };
  }
};

/**
 * Tool configuration for fetching sitemap data.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_sitemap_data',
      description: 'Fetch sitemap data from a specified URL.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL to fetch the sitemap data from.'
          }
        },
        required: ['url']
      }
    }
  }
};

export { apiTool };