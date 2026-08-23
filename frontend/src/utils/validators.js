export function isRequired(value) {
  return (
    value !== null &&
    value !== undefined &&
    String(value).trim().length > 0
  );
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email
  );
}

export function isValidPhone(phone) {
  return /^[0-9+\-\s()]{7,20}$/.test(
    phone
  );
}