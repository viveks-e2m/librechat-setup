import dotenv from 'dotenv';
dotenv.config();
/**
 * Function to get the business summary for a company.
 *
 * @param {Object} args - Arguments for the business summary request.
 * @param {string} args.company_name - The URL of the company for which the business summary is requested.
 * @returns {Promise<Object>} - The result of the business summary request.
 */
const executeFunction = async ({ company_name }) => {
  const pythonHost = process.env.PYTHON_HOST; // will be provided by the user
  try {
    const url = `${pythonHost}/company-business-summary`;
    
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
    console.error('Error fetching business summary:', error);
    return { error: 'An error occurred while fetching the business summary.' };
  }
};

/**
 * Tool configuration for getting the business summary of a company.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_business_summary',
      description: 'Get the business summary for a company.',
      parameters: {
        type: 'object',
        properties: {
          company_name: {
            type: 'string',
            description: 'The URL of the company for which the business summary is requested.'
          }
        },
        required: ['company_name']
      }
    }
  }
};

export { apiTool };