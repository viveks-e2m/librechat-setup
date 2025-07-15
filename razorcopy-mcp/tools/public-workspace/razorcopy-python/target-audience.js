import dotenv from 'dotenv';
dotenv.config();
/**
 * Function to send target audience details to the specified endpoint.
 *
 * @param {Object} args - Arguments for the target audience request.
 * @param {string} args.company_details - The details about the company and its offerings.
 * @returns {Promise<Object>} - The response from the server after sending the target audience details.
 */
const executeFunction = async ({ company_details }) => {
  const pythonHost = process.env.PYTHON_HOST; // will be provided by the user
  try {
    const url = `${pythonHost}/target-audience`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Prepare the body of the request
    const body = JSON.stringify({ company_details });

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
    console.error('Error sending target audience details:', error);
    return { error: 'An error occurred while sending target audience details.' };
  }
};

/**
 * Tool configuration for sending target audience details.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'send_target_audience',
      description: 'Send target audience details to the specified endpoint.',
      parameters: {
        type: 'object',
        properties: {
          company_details: {
            type: 'string',
            description: 'The details about the company and its offerings.'
          }
        },
        required: ['company_details']
      }
    }
  }
};

export { apiTool };