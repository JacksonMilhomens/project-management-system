import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { Project } from "@/common/resources/types";
import { UpdateProjectForm } from "../UpdateProject";
import { useDeleteProject } from "@/common/resources/api/project/hooks";

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useDeleteProject();

  const handleDelete = () => {
    deleteProject(project.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: () => {
        alert("Erro ao deletar o projeto.");
      },
    });
  };

  return (
    <div className="flex items-center">
      <UpdateProjectForm project={project} />

      <Separator className="h-5" orientation="vertical" />

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" disabled={isPending}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você tem certeza que deseja excluir este projeto?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não poderá ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="py-2 px-4">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              className="py-2 px-4 bg-red-600 text-white hover:bg-red-700"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? "Deletando..." : "Confirmar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
