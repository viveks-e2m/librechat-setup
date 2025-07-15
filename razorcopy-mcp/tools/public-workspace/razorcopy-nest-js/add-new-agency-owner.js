/**
 * Function to add a new agency owner.
 *
 * @param {Object} args - Arguments for adding a new agency owner.
 * @param {string} args.firstname - The first name of the agency owner.
 * @param {string} args.lastname - The last name of the agency owner.
 * @param {string} args.email - The email of the agency owner.
 * @param {string} args.password - The password for the agency owner.
 * @param {string} args.roleId - The role ID for the agency owner.
 * @param {string} args.agency_name - The name of the agency.
 * @param {string} args.country - The country of the agency owner.
 * @param {string} args.state - The state of the agency owner.
 * @param {string} args.city - The city of the agency owner.
 * @param {string} args.zipcode - The zipcode of the agency owner.
 * @param {string} args.phone - The phone number of the agency owner.
 * @returns {Promise<Object>} - The result of the API call to add a new agency owner.
 */
const executeFunction = async ({ firstname, lastname, email, password, roleId, agency_name, country, state, city, zipcode, phone }) => {
  const host = process.env.NEST_HOST;
  const token = process.env.ACCESS_TOKEN;
  
  const body = {
    firstname,
    lastname,
    email,
    password,
    roleId,
    agency_name,
    country,
    state,
    city,
    zipcode,
    phone
  };

  try {
    const response = await fetch(`${host}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding new agency owner:', error);
    return { error: 'An error occurred while adding the new agency owner.' };
  }
};

/**
 * Tool configuration for adding a new agency owner.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'add_new_agency_owner',
      description: 'Add a new agency owner.',
      parameters: {
        type: 'object',
        properties: {
          firstname: {
            type: 'string',
            description: 'The first name of the agency owner.'
          },
          lastname: {
            type: 'string',
            description: 'The last name of the agency owner.'
          },
          email: {
            type: 'string',
            description: 'The email of the agency owner.'
          },
          password: {
            type: 'string',
            description: 'The password for the agency owner.'
          },
          roleId: {
            type: 'string',
            description: 'The role ID for the agency owner.'
          },
          agency_name: {
            type: 'string',
            description: 'The name of the agency.'
          },
          country: {
            type: 'string',
            description: 'The country of the agency owner.'
          },
          state: {
            type: 'string',
            description: 'The state of the agency owner.'
          },
          city: {
            type: 'string',
            description: 'The city of the agency owner.'
          },
          zipcode: {
            type: 'string',
            description: 'The zipcode of the agency owner.'
          },
          phone: {
            type: 'string',
            description: 'The phone number of the agency owner.'
          }
        },
        required: ['firstname', 'lastname', 'email', 'password', 'roleId', 'agency_name', 'country', 'state', 'city', 'zipcode', 'phone']
      }
    }
  }
};

export { apiTool };