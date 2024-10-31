import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export const useErrorToastOnError = (isError: boolean) => {
  const { toast } = useToast();
  useEffect(() => {
    if (isError) {
      toast({
        variant: "destructive",
        title: "Wystąpił błąd",
        description:
          "Wystąpił bład podczas pobierania danych. Spróbuj ponownie później.",
      });
    }
  }, [isError, toast]);
};
