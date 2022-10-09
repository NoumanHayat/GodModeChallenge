const env = 'development';
const devBaseUrl =
  'https://ztvixkr91b.execute-api.us-east-1.amazonaws.com/latest/api';
const prodBaseUrl =
  'https://ztvixkr91b.execute-api.us-east-1.amazonaws.com/latest/api';

const baseUrl = env === 'development' ? devBaseUrl : prodBaseUrl;

export default {
  baseUrl,
};
