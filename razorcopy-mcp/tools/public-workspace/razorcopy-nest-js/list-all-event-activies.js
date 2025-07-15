/**
 * Function to list all event activities.
 *
 * @param {Object} args - Arguments for the request.
 * @param {number} [args.limit=1] - The number of records to return.
 * @param {number} [args.page=1] - The page number for pagination.
 * @param {string} [args.eventType] - The type of event to filter by.
 * @param {string} [args.search] - A search term to filter the activities.
 * @param {string} [args.startDate] - The start date for filtering activities.
 * @param {string} [args.endDate] - The end date for filtering activities.
 * @returns {Promise<Object>} - The result of the event activities listing.
 */
const executeFunction = async ({ limit = 1, page = 1, eventType, search, startDate, endDate }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${host}/project-activity`);
    url.searchParams.append('limit', limit);
    if (page) url.searchParams.append('page', page);
    if (eventType) url.searchParams.append('eventType', eventType);
    if (search) url.searchParams.append('search', search);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
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
    console.error('Error listing event activities:', error);
    return { error: 'An error occurred while listing event activities.' };
  }
};

/**
 * Tool configuration for listing event activities.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_event_activities',
      description: 'List all event activities.',
      parameters: {
        type: 'object',
        properties: {
          limit: {
            type: 'integer',
            description: 'The number of records to return.'
          },
          page: {
            type: 'integer',
            description: 'The page number for pagination.'
          },
          eventType: {
            type: 'string',
            description: 'The type of event to filter by.'
          },
          search: {
            type: 'string',
            description: 'A search term to filter the activities.'
          },
          startDate: {
            type: 'string',
            description: 'The start date for filtering activities.'
          },
          endDate: {
            type: 'string',
            description: 'The end date for filtering activities.'
          }
        },
        required: []
      }
    }
  }
};

export { apiTool };