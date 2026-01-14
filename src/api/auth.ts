// frontend/services/authService.ts
import {
  UserRole,
  RegisterRequest,
  SignInRequest,
  VerifyEmailRequest,
  RegisterResponse,
  SignInResponse,
  VerifyEmailResponse,
} from "../types";
import { localStore, STORAGE_KEYS } from "../services/localStore";
import { User } from "../types";

export { type User };

// Function to generate a simple token
const generateToken = () => 'mock-jwt-token-' + Math.random().toString(36).substring(2);

export const registerUser = async (
  data: RegisterRequest
): Promise<RegisterResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = localStore.getItem<User[]>(STORAGE_KEYS.USERS) || [];
  const existingUser = users.find(u => u.email === data.email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: Math.random().toString(36).substring(2, 9),
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: new Date().toISOString(),
    isOnline: true,
    avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`
  };

  localStore.addItemToList(STORAGE_KEYS.USERS, newUser);

  // If investor, create empty investor profile
  if (data.role === 'investor') {
    const newInvestorProfile = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: 'investor',
      bio: '',
      isEmailVerified: false,
      avatar: newUser.avatarUrl,
      isOnline: true,
      lastActiveAt: new Date().toISOString(),
      location: '',
      industries: [],
      investmentStages: [],
      investmentCriteria: [],
      totalInvestments: 0,
      investmentRange: { min: 0, max: 0 },
      portfolioCompanies: []
    };
    localStore.addItemToList(STORAGE_KEYS.INVESTORS, newInvestorProfile);
  }

  return {
    message: "Registration successful",
    id: newUser.id,
    email: newUser.email
  };
};

export const signInUser = async (
  data: SignInRequest
): Promise<SignInResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const users = localStore.getItem<User[]>(STORAGE_KEYS.USERS) || [];
  const user = users.find(u => u.email === data.email);

  // For demo/guest purposes, we might be loose on password, but let's assume if user exists allow login for now 
  // or strictly check if we stored passwords (we didn't store passwords in seed, so we'll just check email for seeded users)
  // For registered users (in this session), we didn't store password either.
  // In a real local mock, we should store password. But for this task, mostly ensuring Guest works.

  // Simplification: valid if user exists.
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // In a real app we would check password. 
  // For this refactor, we are assuming correct password if user found (unsafe but works for mock).
  // Or we could check against a hardcoded "password123" if desired.

  return {
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar: user.avatarUrl,
      location: user.location,
      isOnline: true
    },
    accessToken: generateToken()
  };
};


export const verifyEmail = async (
  data: VerifyEmailRequest
): Promise<VerifyEmailResponse> => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    message: "Email verified",
    user: {
      id: "mock-id",
      name: "Mock User",
      email: data.email,
      role: "entrepreneur",
      bio: "",
      avatar: "",
      location: "",
      isOnline: true
    },
    accessToken: generateToken()
  };
};

export const logoutUser = async (): Promise<{ message: string }> => {
  // Mock implementation
  return { message: "Logged out successfully" };
};
