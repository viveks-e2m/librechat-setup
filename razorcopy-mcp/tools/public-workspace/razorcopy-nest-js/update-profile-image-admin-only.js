/**
 * Function to update the profile image of a user.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.user_id - The ID of the user whose profile image is to be updated.
 * @param {string} args.profile_image - The file path of the new profile image.
 * @returns {Promise<Object>} - The result of the profile image update.
 */
const executeFunction = async ({ user_id, profile_image }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  const formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('profile_image', fs.createReadStream(profile_image));

  try {
    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${host}/users/update-profile-image`, {
      method: 'POST',
      headers,
      body: formData
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
    console.error('Error updating profile image:', error);
    return { error: 'An error occurred while updating the profile image.' };
  }
};

/**
 * Tool configuration for updating the profile image of a user.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_profile_image',
      description: 'Update the profile image of a user.',
      parameters: {
        type: 'object',
        properties: {
          user_id: {
            type: 'string',
            description: 'The ID of the user whose profile image is to be updated.'
          },
          profile_image: {
            type: 'string',
            description: 'The file path of the new profile image.'
          }
        },
        required: ['user_id', 'profile_image']
      }
    }
  }
};

export { apiTool };