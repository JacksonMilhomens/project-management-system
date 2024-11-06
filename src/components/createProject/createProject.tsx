import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Calendar as CalendarIcon } from "lucide-react"
import { PlusCircle } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { DialogFooter, DialogHeader } from "../ui/dialog"
import { Label } from "@radix-ui/react-label"
import { cn } from "@/lib/utils"
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { format } from "date-fns"
import { Calendar } from '../ui/calendar';

interface ProjectData {
    name: string
    department: string
    requester: string
    description: string
    goal: string
    impactsStakeholders: boolean
    complexity: 'High' | 'Medium' | 'Low'
    monthlyRequests: number
    averageTimeSpent: number
    requestDate: Date | undefined
}

export default function CreateProjectForm() {
    const [date, setDate] = useState<Date>()
    const [formData, setFormData] = useState<ProjectData>({
        name: '',
        department: '',
        requester: '',
        description: '',
        goal: 'test',
        impactsStakeholders: false,
        complexity: 'High',
        monthlyRequests: 0,
        averageTimeSpent: 0,
        requestDate: undefined
    })

    // Função para lidar com mudanças nos inputs de texto
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target
        setFormData(prev => ({
            ...prev,
            [id]: value
        }))
    }

    // Função para lidar com mudanças nos selects
    const handleSelectChange = (value: string, field: keyof ProjectData) => {
        setFormData(prev => ({
            ...prev,
            [field]: field === 'impactsStakeholders' ? value === 'true' : value
        }))
    }

    // Função para lidar com mudança de data
    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        setFormData(prev => ({
            ...prev,
            requestDate: newDate
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData);
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
                throw new Error('Erro ao criar projeto')
            }

            const data = await response.json()
            console.log('Projeto criado com sucesso:', data)

            // Limpando a parada depois de dar o post
            setFormData({
                name: '',
                department: '',
                requester: '',
                description: '',
                goal: '',
                impactsStakeholders: false,
                complexity: 'Medium',
                monthlyRequests: 0,
                averageTimeSpent: 0,
                requestDate: undefined
            })
            setDate(undefined)

        } catch (error) {
            console.error('Erro:', error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <PlusCircle className='w-4 h-4 mr-2' />
                    Novo projeto
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Novo projeto</DialogTitle>
                    <DialogDescription>Criar um novo projeto no sistema</DialogDescription>
                </DialogHeader>

                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='name'>Projeto</Label>
                        <Input className='col-span-3' id='name' value={formData.name}
                            onChange={handleInputChange} placeholder='Nome do projeto'></Input>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='department'>Departamento</Label>
                        <Input className='col-span-3' id='department' value={formData.department}
                            onChange={handleInputChange} placeholder='Nome do departamento'></Input>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='requester'>Solicitante</Label>
                        <Input className='col-span-3' id='requester' value={formData.requester}
                            onChange={handleInputChange} placeholder='Nome do solicitante'></Input>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='description'>Descrição</Label>
                        <Textarea placeholder='Descreva o seu projeto' id='description' value={formData.description}
                            onChange={handleInputChange} className='col-span-3' />
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='goal'>Objetivo</Label>
                        <Select onValueChange={(value) => handleSelectChange(value, 'goal')}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder='Selecione o objetivo do projeto' />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='Reduzir volume de atendimento'>Reduzir volume de atendimento</SelectItem>
                                <SelectItem value='Reduzir volume de trabalhos repetitivos'>Reduzir volume de trabalhos repetitivos</SelectItem>
                                <SelectItem value='Melhoria da satisfação do cliente'>Melhoria da satisfação do cliente</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='impactsStakeholders'>Impacta Stakeholders</Label>
                        <Select onValueChange={(value) => handleSelectChange(value, 'impactsStakeholders')}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder='O projeto impacta clientes e/ou parceiros' />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='true'>Sim</SelectItem>
                                <SelectItem value='false'>Não</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='complexity'>Complexidade</Label>
                        <Select onValueChange={(value) => handleSelectChange(value, 'complexity')}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder='Qual a complexidade do projeto?' />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value='High'>Alta</SelectItem>
                                <SelectItem value='Medium'>Média</SelectItem>
                                <SelectItem value='Low'>Baixa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='monthlyRequests'>Número de Solicitações Mensais</Label>
                        <Input className='col-span-3' id='monthlyRequests' type='number' value={formData.monthlyRequests}
                            onChange={handleInputChange} placeholder='Número de solicitações mensais recebidas'></Input>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='averageTimeSpent'>Tempo Médio Gasto</Label>
                        <Input className='col-span-3' id='averageTimeSpent' type="number"
                            value={formData.averageTimeSpent}
                            onChange={handleInputChange} placeholder='Tempo médio gasto em minutos'></Input>
                    </div>

                    <div className='grid grid-cols-4 items-center text-right gap-3'>
                        <Label htmlFor='name'>Data da Solicitação</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                      variant={"outline"}
                                    className={cn(
                                        "col-span-3 justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Data da solicitação</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateChange}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>


                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type='button' variant={'outline'}>Cancelar</Button>
                        </DialogClose>

                        <Button type='submit'>Salvar</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}