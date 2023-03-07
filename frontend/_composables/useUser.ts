
// Value is initialized in: ~/plugins/auth.ts
export const useUser = () => {
  return useState<User>("user", () => undefined);
};
export const fetchCurrentUser = async () => {
  try {
    return await $larafetch<User>("/api/v1/user", {
      redirectIfNotAuthenticated: false,
    });
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
};
