/**
 * Function to create a business description in Razorcopy.
 *
 * @param {Object} args - Arguments for the business description.
 * @param {string} args.website_url - The website URL for the business.
 * @returns {Promise<Object>} - The result of the business description creation.
 */
const executeFunction = async ({ website_url }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL for the POST request
    const url = `${host}/projects/business-summary`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Prepare the request body
    const body = JSON.stringify({ website_url });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
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
    console.error('Error creating business description:', error);
    return { error: 'An error occurred while creating the business description.' };
  }
};

/**
 * Tool configuration for creating a business description in Razorcopy.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_business_description',
      description: 'Create a business description in Razorcopy.',
      parameters: {
        type: 'object',
        properties: {
          website_url: {
            type: 'string',
            description: 'The website URL for the business.'
          }
        },
        required: ['website_url']
      }
    }
  }
};

export { apiTool };