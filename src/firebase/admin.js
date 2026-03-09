const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "achintyasingh48@gmail.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export const isAdminUser = (user) => {
  const email = user?.email?.toLowerCase?.();
  return Boolean(email && ADMIN_EMAILS.includes(email));
};

export { ADMIN_EMAILS };
