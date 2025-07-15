/**
 * Function to add a new teammate.
 *
 * @param {Object} teammate - The teammate information to be added.
 * @param {string} teammate.firstname - The first name of the teammate.
 * @param {string} teammate.lastname - The last name of the teammate.
 * @param {string} teammate.email - The email address of the teammate.
 * @param {string} teammate.password - The password for the teammate's account.
 * @param {string} teammate.phone - The phone number of the teammate.
 * @param {string} teammate.designationId - The ID of the teammate's designation.
 * @param {string} teammate.roleId - The ID of the teammate's role.
 * @param {string} teammate.dob - The date of birth of the teammate.
 * @param {string} teammate.date_of_joining - The date of joining of the teammate.
 * @param {string} teammate.gender - The gender of the teammate.
 * @param {string} teammate.google_drive - The Google Drive link for the teammate.
 * @param {string} teammate.calendly_url - The Calendly URL for the teammate.
 * @param {string} teammate.agency_profile_preferences - The agency profile preferences link.
 * @param {boolean} teammate.is_wfh - Indicates if the teammate works from home.
 * @param {string} teammate.email_signature - The email signature for the teammate.
 * @returns {Promise<Object>} - The result of the teammate addition.
 */
const executeFunction = async (teammate) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    const url = `${host}/users`;
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(teammate)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding new teammate:', error);
    return { error: 'An error occurred while adding the new teammate.' };
  }
};

/**
 * Tool configuration for adding a new teammate.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_new_teammate',
      description: 'Add a new teammate to the system.',
      parameters: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
            description: 'The first name of the teammate.'
          },
          lastname: {
            type: 'string',
            description: 'The last name of the teammate.'
          },
          email: {
            type: 'string',
            description: 'The email address of the teammate.'
          },
          password: {
            type: 'string',
            description: 'The password for the teammate\'s account.'
          },
          phone: {
            type: 'string',
            description: 'The phone number of the teammate.'
          },
          designationId: {
            type: 'string',
            description: 'The ID of the teammate\'s designation.'
          },
          roleId: {
            type: 'string',
            description: 'The ID of the teammate\'s role.'
          },
          dob: {
            type: 'string',
            description: 'The date of birth of the teammate.'
          },
          date_of_joining: {
            type: 'string',
            description: 'The date of joining of the teammate.'
          },
          gender: {
            type: 'string',
            description: 'The gender of the teammate.'
          },
          google_drive: {
            type: 'string',
            description: 'The Google Drive link for the teammate.'
          },
          calendly_url: {
            type: 'string',
            description: 'The Calendly URL for the teammate.'
          },
          agency_profile_preferences: {
            type: 'string',
            description: 'The agency profile preferences link.'
          },
          is_wfh: {
            type: 'boolean',
            description: 'Indicates if the teammate works from home.'
          },
          email_signature: {
            type: 'string',
            description: 'The email signature for the teammate.'
          }
        },
        required: ['firstname', 'lastname', 'email', 'password', 'phone', 'designationId', 'roleId', 'dob', 'date_of_joining', 'gender']
      }
    }
  }
};

export { apiTool };