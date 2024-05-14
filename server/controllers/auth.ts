import { Request, Response } from "express";

interface LoginResponse {
  message: string; // Define the properties and their types
}

export const login = (req: Request, res: Response <LoginResponse>) => {
  res.send({ message: 'Login works' }); // Send an object with the defined type
};