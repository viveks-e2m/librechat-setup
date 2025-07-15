/**
 * Function to update the profile image for the authenticated user.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.profile_image - The file path of the profile image to be uploaded.
 * @returns {Promise<Object>} - The result of the profile image update.
 */
const executeFunction = async ({ profile_image }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;

  try {
    const formData = new FormData();
    formData.append('profile_image', fs.createReadStream(profile_image));

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Perform the fetch request
    const response = await fetch(`${host}/users/self-profile-image`, {
      method: 'POST',
      body: formData,
      headers
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
 * Tool configuration for updating the profile image.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_profile_image',
      description: 'Update the profile image for the authenticated user.',
      parameters: {
        type: 'object',
        properties: {
          profile_image: {
            type: 'string',
            description: 'The file path of the profile image to be uploaded.'
          }
        },
        required: ['profile_image']
      }
    }
  }
};

export { apiTool };