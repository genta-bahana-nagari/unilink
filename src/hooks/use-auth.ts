"use client";

import { useState, useEffect, useCallback } from "react";
import { User } from "@/types/user";
import { api } from "@/lib/mock-api";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    const storedUserId = localStorage.getItem("userId");

    if (storedRole && storedUserId) {
      setRole(storedRole);
      api.getUserById(storedUserId).then(userData => {
        if (userData) {
          setUser(userData);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const users = await api.getUsers();
      const foundUser = users.find(u => u.email === email);

      if (foundUser) {
        localStorage.setItem("userRole", foundUser.role);
        localStorage.setItem("userId", foundUser.id);
        setUser(foundUser);
        setRole(foundUser.role);
        return { success: true, user: foundUser };
      }
      return { success: false, error: "User not found" };
    } catch (error) {
      return { success: false, error: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      const newUser = await api.createUser(userData);
      localStorage.setItem("userRole", newUser.role);
      localStorage.setItem("userId", newUser.id);
      setUser(newUser);
      setRole(newUser.role);
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setUser(null);
    setRole(null);
  }, []);

  const quickLogin = useCallback(async (roleType: string) => {
    setIsLoading(true);
    try {
      const users = await api.getUsersByRole(roleType.toUpperCase());
      if (users.length > 0) {
        const foundUser = users[0];
        localStorage.setItem("userRole", foundUser.role);
        localStorage.setItem("userId", foundUser.id);
        setUser(foundUser);
        setRole(foundUser.role);
        return { success: true, user: foundUser };
      }
      return { success: false, error: "No user found" };
    } catch (error) {
      return { success: false, error: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    role,
    isLoading,
    login,
    register,
    logout,
    quickLogin,
    isAuthenticated: !!user,
  };
}
