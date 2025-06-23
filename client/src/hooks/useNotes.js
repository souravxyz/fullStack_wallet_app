import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiHandler from '../api/apiHandler';
import endpoints from '../api/endpoints';

export const useNotes = () => {
  return useQuery({
    queryKey: ['notes'],
    queryFn: () => apiHandler.get(endpoints.notes.list),
  });
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) =>
      apiHandler.post(endpoints.notes.create, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    }
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => apiHandler.delete(endpoints.notes.delete(id)),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    }
  });
};
