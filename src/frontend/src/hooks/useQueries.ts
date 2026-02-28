import { useQuery } from "@tanstack/react-query";
import type { Game } from "../backend.d";
import { useActor } from "./useActor";

export function useAllGames() {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games", "all"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllGames();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedGames() {
  const { actor, isFetching } = useActor();
  return useQuery<Game[]>({
    queryKey: ["games", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedGames();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGameById(id: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Game>({
    queryKey: ["games", "byId", id],
    queryFn: async () => {
      if (!actor) throw new Error("No actor available");
      return actor.getGameById(id);
    },
    enabled: !!actor && !isFetching && !!id,
    staleTime: 10 * 60 * 1000,
  });
}
