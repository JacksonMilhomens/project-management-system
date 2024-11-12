import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "../ui/scroll-area";
import { Project } from "@/common/resources/types";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateProject } from "@/common/resources/api/project/hooks";
import { DatePicker } from "../ui/date-picker";

interface UpdateProjectFormProps {
  project: Project;
}

export function UpdateProjectForm({ project }: UpdateProjectFormProps) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateProject, isPending: isLoading } = useUpdateProject();

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Nome é obrigatório",
    }),
    department: z.string().min(1, {
      message: "Departamento é obrigatório",
    }),
    requester: z.string().min(1, {
      message: "Solicitante é obrigatório",
    }),
    description: z.string().min(1, {
      message: "Descrição é obrigatória",
    }),
    status: z.string().min(1, {
      message: "Descrição é obrigatória",
    }),
    goal: z.string().min(1, {
      message: "Objetivo é obrigatório",
    }),
    impactStakeholders: z
      .boolean({
        required_error: "Este campo é obrigatório",
        invalid_type_error: "Este campo deve ser verdadeiro ou falso",
      })
      .default(true),
    complexity: z.enum(["High", "Medium", "Low"], {
      required_error: "Complexidade é obrigatória",
      invalid_type_error: "Complexidade deve ser Alta, Média ou Baixa",
    }),
    monthlyRequests: z
      .number({
        required_error: "O número de solicitações é obrigatório",
        invalid_type_error:
          "O número de solicitações deve ser um valor numérico",
      })
      .int()
      .positive({
        message: "O número de solicitações deve ser maior que 0",
      }),
    averageTimeSpent: z
      .number({
        required_error: "O tempo médio gasto é obrigatório",
        invalid_type_error: "O tempo médio deve ser um valor numérico",
      })
      .gt(0, {
        message: "O tempo médio deve ser maior que 0",
      })
      .positive({
        message: "O tempo médio deve ser maior que 0",
      }),
    requestDate: z.union([
      z.string(),
      z.string().datetime({ message: "Data da solicitação é obrigatória" }),
      z.date(),
    ]),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: project.name,
      department: project.department,
      requester: project.requester,
      description: project.description,
      status: project.status,
      goal: project.goal,
      impactStakeholders: project.impactStakeholders,
      complexity: project.complexity,
      monthlyRequests: project.monthlyRequests,
      averageTimeSpent: project.averageTimeSpent,
      requestDate: project.requestDate,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formatDate = (date: Date | string) => {
      if (date instanceof Date) {
        return date.toISOString();
      }
      return new Date(date).toISOString();
    };

    const formattedValues = {
      ...values,
      requestDate: formatDate(values.requestDate),
    };

    updateProject(
      {
        id: project.id,
        data: formattedValues,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["projects"] });
          setIsOpenDialog(false);
        },
        onError: (error: any) => {
          alert(
            "Erro ao atualizar o projeto: " +
              (error.response?.data?.message || error.message)
          );
        },
      }
    );
  }

  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpenDialog(true)}
          variant="ghost"
          className="h-8 w-8 p-0"
        >
          <Eye className="h-4 w-4"></Eye>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-auto max-w-2xl h-auto">
        <DialogHeader>
          <DialogTitle className="pl-4">Editar Projeto</DialogTitle>
          <DialogDescription className="pl-4">
            Atualize as informações do projeto {project.name}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-96 w-auto rounded-md px-3">
              <div className="space-y-4 pb-4">
                <FormItem className="p-1">
                  <FormLabel>ID Externo</FormLabel>
                  <FormControl>
                    <Input
                      value={project.externalId}
                      disabled
                      className="bg-muted"
                    />
                  </FormControl>
                </FormItem>

                <FormItem className="p-1">
                  <FormLabel>Nível de Prioridade</FormLabel>
                  <FormControl>
                    <Input
                      value={project.priorityLevel}
                      disabled
                      className="bg-muted"
                    />
                  </FormControl>
                </FormItem>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <FormLabel>Projeto</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do projeto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="p-1">
                      <FormLabel>Departamento</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do departamento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="requester"
                  render={({ field }) => (
                    <FormItem className="px-1">
                      <FormLabel>Solicitante</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do solicitante" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="px-1">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva o seu projeto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="px-1">
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status do projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Backlog">Backlog</SelectItem>
                            <SelectItem value="In Progress">
                              Em Andamento
                            </SelectItem>
                            <SelectItem value="Declined">Cancelado</SelectItem>
                            <SelectItem value="Completed">Concluído</SelectItem>
                            <SelectItem value="On Hold">Stand By</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem className="px-1">
                      <FormLabel>Objetivo</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o objetivo do projeto" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Reduzir volume de atendimento">
                              Reduzir volume de atendimento
                            </SelectItem>
                            <SelectItem value="Reduzir volume de trabalhos repetitivos">
                              Reduzir volume de trabalhos repetitivos
                            </SelectItem>
                            <SelectItem value="Melhoria da satisfação do cliente">
                              Melhoria da satisfação do cliente
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="impactStakeholders"
                  render={({ field }) => (
                    <FormItem className="px-1">
                      <FormLabel>Impacta Stakeholders</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) =>
                            field.onChange(value === "true")
                          }
                          defaultValue={field.value?.toString()}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="O projeto afeta outras partes interessadas?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="true">Sim</SelectItem>
                            <SelectItem value="false">Não</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="complexity"
                  render={({ field }) => (
                    <FormItem className="px-1">
                      <FormLabel>Complexidade</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Qual a complexidade do projeto?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="High">Alta</SelectItem>
                            <SelectItem value="Medium">Média</SelectItem>
                            <SelectItem value="Low">Baixa</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="monthlyRequests"
                  render={() => (
                    <FormItem className="px-1">
                      <FormLabel>Número de Solicitações Mensais</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Número de solicitações mensais recebidas"
                          {...form.register("monthlyRequests", {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="averageTimeSpent"
                  render={() => (
                    <FormItem className="px-1">
                      <FormLabel>Tempo Médio Gasto</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Tempo médio gasto em minutos"
                          {...form.register("averageTimeSpent", {
                            valueAsNumber: true,
                          })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>

                <FormItem className="p-1">
                  <FormLabel>Minutos Economizados por Mês</FormLabel>
                  <FormControl>
                    <Input
                      value={project.monthlyMinutesSaved.toLocaleString()}
                      disabled
                      className="bg-muted"
                    />
                  </FormControl>
                </FormItem>

                <FormItem className="p-1">
                  <FormLabel>Ganho Financeiro</FormLabel>
                  <FormControl>
                    <Input
                      value={project.financialGain}
                      disabled
                      className="bg-muted"
                    />
                  </FormControl>
                </FormItem>

                <FormItem className="p-1">
                  <FormLabel>Faixa de Ganho</FormLabel>
                  <FormControl>
                    <Input
                      value={project.rangeOfGain}
                      disabled
                      className="bg-muted"
                    />
                  </FormControl>
                </FormItem>

                <FormField
                  control={form.control}
                  name="requestDate"
                  render={({ field }) => (
                    <FormItem className="px-1">
                      <FormLabel>Data da Solicitação</FormLabel>
                      <div>
                        <DatePicker
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          onChange={(date) =>
                            field.onChange(date?.toISOString())
                          }
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <DialogFooter className="pr-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    Salvando...
                  </div>
                ) : (
                  "Salvar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}