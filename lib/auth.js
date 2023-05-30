import { hash, compare } from "bcryptjs";

export async function hashPassword(password) {
  //the second parameter determined how strong this encryption is
  //the higher the number, the higher the time it takes to execute
  //12 is OK
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
