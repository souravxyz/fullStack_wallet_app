// hooks/useUser.js
import { useQuery } from '@tanstack/react-query';
import apiHandler from '../api/apiHandler';
import endpoints from '../api/endpoints';

export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await apiHandler.get(endpoints.auth.profile);
      return res.user; 
    },
    staleTime: 5 * 60 * 1000, // optional: cache user data for 5 minutes
  });
};
