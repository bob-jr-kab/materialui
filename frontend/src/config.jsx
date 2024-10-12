const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://multiappserver-b6t08m1oj-bob-jr-kabs-projects.vercel.app"
    : "http://localhost:5000";

export default baseUrl;
