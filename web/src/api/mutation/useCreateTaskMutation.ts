import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api";
import { useToast } from "@/hooks/use-toast";

export const useCreateTaskMutation = () => {
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({
      id,
      description,
    }: {
      id: number;
      description: string;
    }) => {
      return await API_URLS.CREATE_TASK(id, description);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Wystąpił błąd",
        description:
          "Wystąpił bład dodawania zadania. Spróbuj ponownie później.",
      });
    },
    onSuccess: () => {
      toast({
        variant: "default",
        description: "Zadanie zostało dodane.",
      });
    },
  });
};
