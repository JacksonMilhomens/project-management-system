import { useCreateProject } from "@/common/resources/api/project/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { PlusCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "react-day-picker";
import { useForm, Form } from "react-hook-form";
import { z } from "zod";
import { DatePicker } from "../ui/date-picker";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";


export function CreateProjectForm() {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const createProject = useCreateProject();
  const queryClient = useQueryClient();

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
    goal: z.string().min(1, {
      message: "Objetivo é obrigatório",
    }),
    impactStakeholders: z.boolean({
      required_error: "Este campo é obrigatório",
      invalid_type_error: "Este campo deve ser verdadeiro ou falso",
    }),
    complexity: z.string().min(1, {
      message: "Complexidade é obrigatória",
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
    requestDate: z.date({
      required_error: "Data da solicitação é obrigatória",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      department: "",
      requester: "",
      description: "",
      goal: "",
      impactStakeholders: undefined,
      complexity: "",
      monthlyRequests: 0,
      averageTimeSpent: 0,
      requestDate: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
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

    try {
      await createProject.mutateAsync(formattedValues);
      form.reset();
      setIsOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpenDialog(true)}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Novo projeto
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-auto max-w-2xl h-auto">
          <DialogHeader>
            <DialogTitle className="pl-4">Novo projeto</DialogTitle>
            <DialogDescription className="pl-4">
              Criar um novo projeto no sistema
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ScrollArea className="h-96 w-auto rounded-md px-3">
                <div className="space-y-4 pb-4">
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
                          <Input
                            placeholder="Nome do departamento"
                            {...field}
                          />
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
                    name="goal"
                    render={({ field }) => (
                      <FormItem className="px-1">
                        <FormLabel>Objetivo</FormLabel>
                        <FormControl>
                          <Select
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

                  <FormField
                    control={form.control}
                    name="requestDate"
                    render={({ field }) => (
                      <FormItem className="px-1">
                        <FormLabel>Data da Solicitação</FormLabel>
                        <div>
                          <DatePicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </ScrollArea>

              <DialogFooter className="pr-4">
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={createProject.isPending}
                >
                  {createProject.isPending ? (
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
    </div>
  );
}
