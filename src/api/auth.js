export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("Token"));
  console.log(token);
  let result = {};
  if (token) {
    result = `Bearer ${token}`;
    return { Authorization: result };
  } else {
    return result;
  }
}
export function cleanToken() {
  localStorage.removeItem("Token");
  localStorage.removeItem("Auth");
  localStorage.removeItem("RefreshToken");
}
