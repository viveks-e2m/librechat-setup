/**
 * Function to add a new agent member.
 *
 * @param {Object} args - The details of the agent member to be added.
 * @param {string} args.firstname - The first name of the agent member.
 * @param {string} args.lastname - The last name of the agent member.
 * @param {string} args.email - The email address of the agent member.
 * @param {string} args.password - The password for the agent member.
 * @param {string} args.roleId - The role ID for the agent member.
 * @param {string} args.agencyId - The agency ID for the agent member.
 * @returns {Promise<Object>} - The response from the API after adding the agent member.
 */
const executeFunction = async ({ firstname, lastname, email, password, roleId, agencyId }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;

  const body = {
    firstname,
    lastname,
    email,
    password,
    roleId,
    agencyId
  };

  try {
    // Perform the fetch request
    const response = await fetch(`${host}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
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
    console.error('Error adding new agent member:', error);
    return { error: 'An error occurred while adding the new agent member.' };
  }
};

/**
 * Tool configuration for adding a new agent member.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_new_agent_member',
      description: 'Add a new agent member.',
      parameters: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
            description: 'The first name of the agent member.'
          },
          lastname: {
            type: 'string',
            description: 'The last name of the agent member.'
          },
          email: {
            type: 'string',
            description: 'The email address of the agent member.'
          },
          password: {
            type: 'string',
            description: 'The password for the agent member.'
          },
          roleId: {
            type: 'string',
            description: 'The role ID for the agent member.'
          },
          agencyId: {
            type: 'string',
            description: 'The agency ID for the agent member.'
          }
        },
        required: ['firstname', 'lastname', 'email', 'password', 'roleId', 'agencyId']
      }
    }
  }
};

export { apiTool };