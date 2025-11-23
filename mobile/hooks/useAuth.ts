import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) => authService.login(username, password),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => authService.logout(),
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => authService.refresh(),
  });
};