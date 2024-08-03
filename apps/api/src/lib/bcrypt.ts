import * as bcrypt from 'bcrypt'

export const comparePassword = async (
  candidatePassowrd: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(candidatePassowrd, hashedPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRouonds = 10;
  return await bcrypt.hash(password, saltRouonds);
};
