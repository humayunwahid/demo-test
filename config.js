let config = null;

export const fetchConfig = async () => {
  try {
    // Remove the token and Authorization header since you're not using a token
    const response = await fetch('https://aryzap.com/api/demozap/saved_fetchConfig_demo.php', {
        method: 'GET', // Optional, since GET is the default
        headers: {
          'Content-Type': 'application/json', // Optional, but good practice to specify
        },
      });
    if (!response.ok) {
      throw new Error(`Failed to fetch configuration: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    config = data.appsConfig; // Ensure the structure matches your API response
    console.log('Configuration loaded:');
  } catch (error) {
    console.error('Error fetching configuration:', error.message);
    throw error; // Rethrow or handle appropriately
  }
};

export const getConfig = () => {
  if (!config) {
    throw new Error('Configuration has not been loaded yet. Please call fetchConfig first.');
  }
  return config;
};

// Optional: Example usage pattern
(async () => {
  try {
    await fetchConfig();
    const appConfig = getConfig();
    // console.log('App Config:', appConfig);
    console.log('App Config: Loaded');
  } catch (error) {
    console.error('App initialization failed:', error.message);
  }
})();