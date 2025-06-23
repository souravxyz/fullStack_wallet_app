import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiHandler from '../api/apiHandler';
import endpoints from '../api/endpoints';

export const useFamily = () => {
  return useQuery({
    queryKey: ['family'],
    queryFn: () => apiHandler.get(endpoints.family.list),
  });
};

export const useAddFamily = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiHandler.post(endpoints.family.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['family']);
    },
  });
};

export const useAddFamilyWallet = (memberId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      apiHandler.post(endpoints.family.addWallet(memberId), data),
    onSuccess: () => {
      queryClient.invalidateQueries(['family']);
    },
  });
};
export const useDeleteFamily = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiHandler.delete(endpoints.family.delete(id)),
    onSuccess: () => queryClient.invalidateQueries(['family']),
  });
};
