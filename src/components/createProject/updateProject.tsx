import { cn } from "@/lib/utils"
import { Eye, Loader2, PlusCircle } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"
import { DialogHeader, DialogFooter, Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "../ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Switch } from "../ui/switch"
import { ScrollArea } from "../ui/scroll-area"


interface ProjectData {
    name: string;
    department: string
    requester: string
    description: string
    goal: string
    impactStakeholders: boolean
    complexity: 'High' | 'Medium' | 'Low'
    monthlyRequests: number
    averageTimeSpent: number
    requestDate: Date | undefined | string
}

export default function UpdateProjectForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const formSchema = z.object({
        name: z.string().min(1, {
            message: "Nome é obrigatório"
        }),
        department: z.string().min(1, {
            message: "Departamento é obrigatório"
        }),
        requester: z.string().min(1, {
            message: "Solicitante é obrigatório"
        }),
        description: z.string().min(1, {
            message: "Descrição é obrigatória"
        }),
        goal: z.string().min(1, {
            message: "Objetivo é obrigatório"
        }),
        impactStakeholders: z.boolean({
            required_error: "Este campo é obrigatório",
            invalid_type_error: "Este campo deve ser verdadeiro ou falso"
        }).default(true),
        complexity: z.string().min(1, {
            message: "Complexidade é obrigatória"
        }),
        monthlyRequests: z.number({ 
            required_error: "O número de solicitações é obrigatório", 
            invalid_type_error: "O número de solicitações deve ser um valor numérico" 
        }).int().positive({
            message: "O número de solicitações deve ser maior que 0"
        }),
        averageTimeSpent: z.number({ 
            required_error: "O tempo médio gasto é obrigatório", 
            invalid_type_error: "O tempo médio deve ser um valor numérico"
        }).gt(0, {
            message: "O tempo médio deve ser maior que 0"
        }).positive({
            message: "O tempo médio deve ser maior que 0"
        }),
        requestDate: z.union([z.string().datetime({ message: 'Data da solicitação é obrigatória' }), z.date()]),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            department: "",
            requester: "",
            description: "",
            goal: "",
            impactStakeholders: true,
            complexity: '',
            monthlyRequests: 0,
            averageTimeSpent: 0,
            requestDate: ''
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            const response = await fetch('https://project-management-wobh.onrender.com/project', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',    
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })

            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                throw new Error('Erro ao criar projeto')
            }

            const data = await response.text()
            console.log('Projeto criado com sucesso:', data)
        } catch (error) {
            console.error('Erro:', error)
        }

        setIsLoading(false);
        setIsOpenDialog(false);
    }
    
    const [date, setDate] = useState<Date>()
    const [formData, setFormData] = useState<ProjectData>({
        name: '',
        department: '',
        requester: '',
        description: '',
        goal: '',
        impactStakeholders: false,
        complexity: 'Medium',
        monthlyRequests: 0,
        averageTimeSpent: 0,
        requestDate: undefined
    })

    // Função para lidar com mudanças nos inputs de texto
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = e.target
        console.log(value)
        setFormData(prev => ({
            ...prev,
            [id]: type === 'number' ? Number(value) : value
        }))
    }

    // Função para lidar com mudanças nos selects
    const handleSelectChange = (value: string | boolean, field: keyof ProjectData) => {
        if (value === 'true') {
            value = true
        }
        if (value === 'false') {
            value = false
        }
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    // Função para lidar com mudança de data
    const handleDateChange = (newDate: Date | undefined) => {
        console.log('Alterando a data')
        setDate(newDate)
        setFormData(prev => ({
            ...prev,
            requestDate: newDate?.toISOString()
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        console.log(formData)

        // formData['requestDate'] = formData.requestDate ? new Date(formData.requestDate).toISOString() : formData.requestDate
        try {
            const response = await fetch('https://project-management-wobh.onrender.com/project', {
                method: 'POST',
                headers: {
                    'Accept': '*/*',    
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                const data = await response.json()
                console.log(data)
                throw new Error('Erro ao criar projeto')
            }

            const data = await response.text()
            console.log('Projeto criado com sucesso:', data)

            // Limpando a parada depois de dar o post
            setFormData({
                name: '',
                department: '',
                requester: '',
                description: '',
                goal: '',
                impactStakeholders: false,
                complexity: 'Medium',
                monthlyRequests: 0,
                averageTimeSpent: 0,
                requestDate: ''
            })
            setDate(undefined)

        } catch (error) {
            console.error('Erro:', error)
        }
    }

    return (
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpenDialog(true)} variant="ghost" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4"></Eye>
                </Button>
            </DialogTrigger>
        
            <DialogContent className="max-h-auto max-w-2xl h-auto">
                <DialogHeader>
                    <DialogTitle className="pl-4">Projeto</DialogTitle>
                    <DialogDescription className="pl-4">Visualize ou edite as informações de seu projeto</DialogDescription>
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
                        )}>
                    </FormField>
                
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
                        )}>
                    </FormField>
                
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
                        )}>
                    </FormField>
                
                    <FormField                     
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Descreva o seu projeto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>
                
                    <FormField                     
                        control={form.control}
                        name="goal"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Objetivo</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Selecione o objetivo do projeto' />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value='Reduzir volume de atendimento'>Reduzir volume de atendimento</SelectItem>
                                            <SelectItem value='Reduzir volume de trabalhos repetitivos'>Reduzir volume de trabalhos repetitivos</SelectItem>
                                            <SelectItem value='Melhoria da satisfação do cliente'>Melhoria da satisfação do cliente</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField                     
                        control={form.control}
                        name="impactStakeholders"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Impacta Stakeholders</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={(value) => field.onChange(value === "true")}
                                        defaultValue={field.value ? "true" : "false"}
                                        className="flex space-y-1"
                                        >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="true" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Sim
                                            </FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="false" />
                                            </FormControl>
                                            <FormLabel className="font-normal">
                                                Não
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField                     
                        control={form.control}
                        name="complexity"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Complexidade</FormLabel>
                                <FormControl>
                                    <Select {...field} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Qual a complexidade do projeto?' />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value='High'>Alta</SelectItem>
                                            <SelectItem value='Medium'>Média</SelectItem>
                                            <SelectItem value='Low'>Baixa</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField                     
                        control={form.control}
                        name="monthlyRequests"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Número de Solicitações Mensais</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Número de solicitações mensais recebidas"  {...form.register("monthlyRequests", { valueAsNumber: true })} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField                     
                        control={form.control}
                        name="averageTimeSpent"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Tempo Médio Gasto</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Tempo médio gasto em minutos" {...form.register("averageTimeSpent", { valueAsNumber: true })} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>

                    <FormField                     
                        control={form.control}
                        name="requestDate"
                        render={({ field }) => (
                            <FormItem className="px-1">
                                <FormLabel>Data da Solicitação</FormLabel>
                                <FormControl>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "col-span-3 justify-start text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? format(field.value, "dd/MM/yyyy") : <span>Data da solicitação</span>}
                                            </Button>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                required
                                                mode="single"
                                                id="requestDate"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) => field.onChange(date ? date.toISOString() : '')}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>
                
                    </div>
                    </ScrollArea>

                    <DialogFooter className="pr-4">
                            <Button type="submit" onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="animate-spin" />
                                        Salvando...
                                    </div>
                                ) : (
                                    'Salvar'
                                )}
                            </Button>
                    </DialogFooter>

                </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
