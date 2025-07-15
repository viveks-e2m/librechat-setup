import dotenv from 'dotenv';
dotenv.config();

/**
 * Function to check if a title already exists for a given project.
 *
 * @param {Object} args - Arguments for the title check.
 * @param {string} args.ProjectId - The ID of the project to check the title against.
 * @param {string} args.title - The title to check for existence.
 * @returns {Promise<Object>} - The result of the title check.
 */
const executeFunction = async ({ ProjectId, title }) => {
  const pythonHost = process.env.PYTHON_HOST; // will be provided by the user
  const url = `${pythonHost}/check-title`;
  const data = {
    ProjectId,
    title
  };

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error checking title existence:', error);
    return { error: 'An error occurred while checking the title existence.' };
  }
};

/**
 * Tool configuration for checking existing titles.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'check_existing_title',
      description: 'Check if a title already exists for a given project.',
      parameters: {
        type: 'object',
        properties: {
          ProjectId: {
            type: 'string',
            description: 'The ID of the project to check the title against.'
          },
          title: {
            type: 'string',
            description: 'The title to check for existence.'
          }
        },
        required: ['ProjectId', 'title']
      }
    }
  }
};

export { apiTool };