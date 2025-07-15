/**
 * Function to edit a teammate's details.
 *
 * @param {Object} args - Arguments for editing the teammate.
 * @param {string} args.userId - The ID of the user to be edited.
 * @param {Object} args.userData - The data to update for the user.
 * @param {string} args.userData.firstname - The first name of the user.
 * @param {string} args.userData.lastname - The last name of the user.
 * @param {string} args.userData.email - The email address of the user.
 * @param {string} args.userData.designationId - The ID of the designation.
 * @param {string} args.userData.roleId - The ID of the role.
 * @param {string} args.userData.dob - The date of birth of the user.
 * @param {string} args.userData.date_of_joining - The date of joining.
 * @param {string} args.userData.gender - The gender of the user.
 * @param {string} args.userData.google_drive - The Google Drive link.
 * @param {string} args.userData.calendly_url - The Calendly URL.
 * @param {string} args.userData.agent_profile_preferences - The agent profile preferences.
 * @param {boolean} args.userData.is_wfh - Whether the user works from home.
 * @param {string} args.userData.email_signature - The email signature of the user.
 * @param {Array<string>} args.userData.managed_by - The IDs of users managing this user.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ userId, userData }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    const url = `${host}/users/${userId}`;
    
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error editing teammate:', error);
    return { error: 'An error occurred while editing the teammate.' };
  }
};

/**
 * Tool configuration for editing a teammate's details.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'edit_teammate',
      description: 'Edit a teammate\'s details.',
      parameters: {
        type: 'object',
        properties: {
          userId: {
            type: 'string',
            description: 'The ID of the user to be edited.'
          },
          userData: {
            type: 'object',
            properties: {
              firstname: {
                type: 'string',
                description: 'The first name of the user.'
              },
              lastname: {
                type: 'string',
                description: 'The last name of the user.'
              },
              email: {
                type: 'string',
                description: 'The email address of the user.'
              },
              designationId: {
                type: 'string',
                description: 'The ID of the designation.'
              },
              roleId: {
                type: 'string',
                description: 'The ID of the role.'
              },
              dob: {
                type: 'string',
                description: 'The date of birth of the user.'
              },
              date_of_joining: {
                type: 'string',
                description: 'The date of joining.'
              },
              gender: {
                type: 'string',
                description: 'The gender of the user.'
              },
              google_drive: {
                type: 'string',
                description: 'The Google Drive link.'
              },
              calendly_url: {
                type: 'string',
                description: 'The Calendly URL.'
              },
              agent_profile_preferences: {
                type: 'string',
                description: 'The agent profile preferences.'
              },
              is_wfh: {
                type: 'boolean',
                description: 'Whether the user works from home.'
              },
              email_signature: {
                type: 'string',
                description: 'The email signature of the user.'
              },
              managed_by: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'The IDs of users managing this user.'
              }
            },
            required: ['firstname', 'lastname', 'email', 'designationId', 'roleId', 'dob', 'date_of_joining', 'gender']
          }
        },
        required: ['userId', 'userData']
      }
    }
  }
};

export { apiTool };