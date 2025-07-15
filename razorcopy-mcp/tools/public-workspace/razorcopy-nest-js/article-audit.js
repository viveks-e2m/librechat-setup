/**
 * Function to fetch the audit report for a specific article.
 *
 * @param {Object} args - Arguments for the audit report request.
 * @param {string} args.articleId - The ID of the article to fetch the audit report for.
 * @param {boolean} [args.refresh=false] - Whether to refresh the report.
 * @returns {Promise<Object>} - The result of the audit report fetch.
 */
const executeFunction = async ({ articleId, refresh = false }) => {
  const host = 'http://localhost:8001';
  const token = process.env.PUBLIC_WORKSPACE_DEMO_API_KEY;
  try {
    // Construct the URL with the article ID
    const url = new URL(`${host}/article/${articleId}/audit-report`);
    if (refresh) {
      url.searchParams.append('refresh', 'true');
    }

    // Set up headers for the request
    const headers = {
      'Authorization': `Bearer ${token}`
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
    console.error('Error fetching article audit report:', error);
    return { error: 'An error occurred while fetching the article audit report.' };
  }
};

/**
 * Tool configuration for fetching article audit reports.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'fetch_article_audit_report',
      description: 'Fetch the audit report for a specific article.',
      parameters: {
        type: 'object',
        properties: {
          articleId: {
            type: 'string',
            description: 'The ID of the article to fetch the audit report for.'
          },
          refresh: {
            type: 'boolean',
            description: 'Whether to refresh the report.'
          }
        },
        required: ['articleId']
      }
    }
  }
};

export { apiTool };