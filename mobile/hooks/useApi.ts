import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ownerService } from "../services/owner.service";

export const useOwners = (limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["owners", limit],
    queryFn: ({ pageParam = 1 }) => ownerService.getAll(pageParam, limit),
    getNextPageParam: (lastPage: any) => {
      return lastPage.pagination.hasNext
        ? lastPage.pagination.page + 1
        : undefined;
    },
    initialPageParam: 1,
  });
};

export const useOwner = (id: string) => {
  return useQuery({
    queryKey: ["owner", id],
    queryFn: () => ownerService.getById(id),
    enabled: !!id,
  });
};

export const useCreateOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ownerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
  });
};

export const useUpdateOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      ownerService.update(id, data),
    onSuccess: (_: any, variables: any) => {
      queryClient.invalidateQueries({ queryKey: ["owner", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
  });
};

export const useDeleteOwner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ownerService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
  });
};
