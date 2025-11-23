export const getInitials = (firstName?: string, lastName?: string) =>
  `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase();

export const calcAge = (dob: string) => {
  const d = new Date(dob);
  if (isNaN(d.getTime())) return "Age: -";
  const now = new Date();
  let years = now.getFullYear() - d.getFullYear();
  let months = now.getMonth() - d.getMonth();
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return `Age: ${years} years ${months} months`;
};
