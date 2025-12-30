export async function protectedFetch(
  input: RequestInfo,
  init?: RequestInit
) {
  // 1. First attempt
  let response = await fetch(input, {
    ...init,
    credentials: "include", // IMPORTANT
  });
  console.log({response})

  // 2. If access token expired
  if (response.status === 401) {
    console.log("protected Fetch")
    // Try refresh
    const refreshRes = await fetch("/api/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    // 3. If refresh fails → logout
    if (!refreshRes.ok) {
        console.log("function called")
      window.location.href = "/auth/login";
      return response;
    }

    // 4. Retry original request
    response = await fetch(input, {
      ...init,
      credentials: "include",
    });
  }

  return response;
}
