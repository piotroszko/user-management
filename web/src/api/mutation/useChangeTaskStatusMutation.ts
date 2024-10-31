import { useMutation } from "@tanstack/react-query";
import { API_URLS } from "../api";
import { useToast } from "@/hooks/use-toast";

export const useChangeTaskStatusMutation = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({
      status,
      id,
      taskId,
    }: {
      id: number;
      taskId: number;
      status: "resolved" | "unresolved";
    }) => {
      return await API_URLS.PATCH_TASK_STATUS(id, taskId, status);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Wystąpił błąd",
        description:
          "Wystąpił bład podczas zmiany statusu zadania. Spróbuj ponownie później.",
      });
    },
  });
};
