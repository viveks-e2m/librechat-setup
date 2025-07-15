import dotenv from 'dotenv';
dotenv.config();
/**
 * Function to find sitemap details for a given company.
 *
 * @param {Object} args - Arguments for the sitemap request.
 * @param {string} args.company_name - The URL of the company for which to fetch the sitemap.
 * @returns {Promise<Object>} - The result of the sitemap detail request.
 */
const executeFunction = async ({ company_name }) => {
  const pythonHost = process.env.PYTHON_HOST;  // will be provided by the user
  try {
    const url = `${pythonHost}/fetch-sitemaps`;
    
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Prepare the request body
    const body = JSON.stringify({ company_name });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
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
    console.error('Error fetching sitemap details:', error);
    return { error: 'An error occurred while fetching sitemap details.' };
  }
};

/**
 * Tool configuration for finding sitemap details.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'find_sitemap_detail',
      description: 'Find sitemap details for a given company.',
      parameters: {
        type: 'object',
        properties: {
          company_name: {
            type: 'string',
            description: 'The URL of the company for which to fetch the sitemap.'
          }
        },
        required: ['company_name']
      }
    }
  }
};

export { apiTool };