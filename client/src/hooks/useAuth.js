import { useMutation } from "@tanstack/react-query";
import apiHandler from "../api/apiHandler";
import endpoints from "../api/endpoints";

// Register user
export const useRegister = () =>
  useMutation({
    mutationFn: async (formData) => {
      return await apiHandler.post(endpoints.auth.register, formData);
    },
  });

// Login user
export const useLogin = () =>
  useMutation({
    mutationFn: async (data) => {
      return await apiHandler.post(endpoints.auth.login, data);
    },
  });

// Forgot password
export const useForgotPassword = () =>
  useMutation({
    mutationFn: async (data) => {
      return await apiHandler.post(endpoints.auth.forgotPassword, data);
    },
  });

// Reset password
export const useResetPassword = (token) =>
  useMutation({
    mutationFn: async (data) => {
      return await apiHandler.post(endpoints.auth.resetPassword(token), data);
    },
  });
// Change password
export const useChangePassword = () =>
  useMutation({
    mutationFn: async (data) => {
      return await apiHandler.post(endpoints.auth.changePassword, data);
    },
  });

// Logout user
export const useLogout = () =>
  useMutation({
    mutationFn: async () => {
      return await apiHandler.get(endpoints.auth.logout);
    },
  });
