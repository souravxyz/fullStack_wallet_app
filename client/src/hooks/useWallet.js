import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiHandler from '../api/apiHandler';
import endpoints from '../api/endpoints';

export const useWalletItems = () => {
  return useQuery({
    queryKey: ['wallet'],
    queryFn: () => apiHandler.get(endpoints.wallet.list),
  });
};

export const useAddWalletItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => apiHandler.post(endpoints.wallet.create, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['wallet']);
    }
  });
};

export const useDeleteWalletItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiHandler.delete(endpoints.wallet.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries(['wallet']);
    }
  });
};
