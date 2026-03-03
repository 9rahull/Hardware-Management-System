export const loginUser = async (username, password) => {
  const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};

export const getDashboardData = async () => {
  const response = await fetch(
    "http://127.0.0.1:8000/api/analytics/dashboard/",
  );
  return response.json();
};
