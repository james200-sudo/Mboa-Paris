const axios = require('axios');

module.exports = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const location = response.data.results[0]?.geometry.location;
    return location || null;
  } catch (err) {
    console.error('Geocode error:', err.message);
    return null;
  }
};
