import dotenv from 'dotenv';
dotenv.config();
/**
 * Function to perform a site audit using Razorcopy's API.
 *
 * @param {Object} args - Arguments for the site audit.
 * @param {string} args.url - The URL of the site to audit.
 * @returns {Promise<Object>} - The result of the site audit.
 */
const executeFunction = async ({ url }) => {
  const pythonHost = process.env.PYTHON_HOST; // will be provided by the user
  try {
    // Construct the URL for the API request
    const apiUrl = `${pythonHost}/seo-audit/audits`;

    // Set up the request body
    const body = JSON.stringify({ url });

    // Perform the fetch request
    const response = await fetch(apiUrl, {
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
    console.error('Error performing site audit:', error);
    return { error: 'An error occurred while performing the site audit.' };
  }
};

/**
 * Tool configuration for performing a site audit using Razorcopy's API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'site_audit',
      description: 'Perform a site audit using Razorcopy\'s API.',
      parameters: {
        type: 'object',
        properties: {
          url: {
            type: 'string',
            description: 'The URL of the site to audit.'
          }
        },
        required: ['url']
      }
    }
  }
};

export { apiTool };