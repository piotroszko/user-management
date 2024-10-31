import { useCreateTaskMutation } from "@/api/mutation/useCreateTaskMutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface AddTaskProps {
  userId: number;
}

const AddTask = ({ userId }: AddTaskProps) => {
  const [description, setDescription] = useState("");
  const { mutate, isPending } = useCreateTaskMutation();

  const onCreateTask = async () => {
    mutate({
      id: userId,
      description,
    });
    setDescription("");
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="ml-auto">
          Utwórz zadanie
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80"
        onPointerDownOutside={(e) => {
          if (isPending) e.preventDefault();
        }}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Tworzenie zadania</h4>
            <p className="text-sm text-muted-foreground">
              Utwórz nowe zadanie dla użytkownika
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="description">Opis</Label>
              <Input
                id="description"
                className="col-span-4 h-8"
                disabled={isPending}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
          <Button
            variant="default"
            className="w-full"
            disabled={isPending}
            onClick={onCreateTask}>
            Utwórz
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddTask;
