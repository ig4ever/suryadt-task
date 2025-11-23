import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ownerService } from "../services/owner.service";
import { petService } from "../services/pet.service";

export const useOwners = (
  limit: number = 10,
  sortBy: "name" | "cats" = "name",
  search?: string
) => {
  return useInfiniteQuery({
    queryKey: ["owners", limit, sortBy, search],
    queryFn: ({ pageParam = 1 }) =>
      ownerService.getAll(pageParam, limit, sortBy, search),
    getNextPageParam: (lastPage: any, _pages: any, lastPageParam: any) => {
      return Array.isArray(lastPage) && lastPage.length === limit
        ? lastPageParam + 1
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

export const useCurrentMaster = () => {
  return useQuery({
    queryKey: ["master", "current"],
    queryFn: () => ownerService.getCurrentMaster(),
  });
};

export const useMakeMaster = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ownerService.setMaster(id),
    onSuccess: (_owner: any) => {
      queryClient.invalidateQueries({ queryKey: ["master", "current"] });
      queryClient.invalidateQueries({ queryKey: ["owners"] });
    },
  });
};

export const usePetsByMaster = (masterId: string, limit: number = 10) => {
  return useInfiniteQuery({
    queryKey: ["pets", masterId, limit],
    queryFn: ({ pageParam = 1 }) =>
      petService.getByMaster(masterId, pageParam, limit),
    getNextPageParam: (lastPage: any, _pages: any, lastPageParam: any) => {
      return Array.isArray(lastPage) && lastPage.length === limit
        ? lastPageParam + 1
        : undefined;
    },
    enabled: !!masterId,
    initialPageParam: 1,
  });
};
