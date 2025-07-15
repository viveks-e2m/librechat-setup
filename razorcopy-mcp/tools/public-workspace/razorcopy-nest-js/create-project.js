/**
 * Function to create a project in Razorcopy.
 *
 * @param {Object} args - Arguments for the project creation.
 * @param {string} args.name - The name of the project.
 * @param {string} args.description - The description of the project.
 * @param {Array<string>} args.competitors_websites - List of competitor websites.
 * @param {Array<Object>} args.targeted_keywords - List of targeted keywords with prompt type IDs.
 * @param {string} args.website_url - The URL of the website.
 * @param {string} args.language - The language of the project.
 * @param {Array<string>} args.location - The locations targeted by the project.
 * @param {Array<string>} args.assign_to - List of user IDs to assign the project to.
 * @param {string} [args.guideline_id] - Optional guideline ID for the project.
 * @param {string} [args.guideline_description] - Optional guideline description.
 * @param {string} [args.targeted_audience] - Optional targeted audience description.
 * @returns {Promise<Object>} - The result of the project creation.
 */
const executeFunction = async ({ name, description, competitors_websites, targeted_keywords, website_url, language, location, assign_to, guideline_id, guideline_description, targeted_audience }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    const url = `${host}/projects`;

    const body = {
      name,
      description,
      competitors_websites,
      targeted_keywords,
      website_url,
      language,
      location,
      assign_to,
      guideline_id,
      guideline_description,
      targeted_audience
    };

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating project:', error);
    return { error: 'An error occurred while creating the project.' };
  }
};

/**
 * Tool configuration for creating a project in Razorcopy.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_project',
      description: 'Create a new project in Razorcopy.',
      parameters: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'The name of the project.'
          },
          description: {
            type: 'string',
            description: 'The description of the project.'
          },
          competitors_websites: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of competitor websites.'
          },
          targeted_keywords: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                keyword: {
                  type: 'string',
                  description: 'The targeted keyword.'
                },
                promptTypeId: {
                  type: 'string',
                  description: 'The ID of the prompt type.'
                }
              }
            },
            description: 'List of targeted keywords with prompt type IDs.'
          },
          website_url: {
            type: 'string',
            description: 'The URL of the website.'
          },
          language: {
            type: 'string',
            description: 'The language of the project.'
          },
          location: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'The locations targeted by the project.'
          },
          assign_to: {
            type: 'array',
            items: {
              type: 'string'
            },
            description: 'List of user IDs to assign the project to.'
          },
          guideline_id: {
            type: 'string',
            description: 'Optional guideline ID for the project.'
          },
          guideline_description: {
            type: 'string',
            description: 'Optional guideline description.'
          },
          targeted_audience: {
            type: 'string',
            description: 'Optional targeted audience description.'
          }
        },
        required: ['name', 'description', 'competitors_websites', 'targeted_keywords', 'website_url', 'language', 'location', 'assign_to']
      }
    }
  }
};

export { apiTool };