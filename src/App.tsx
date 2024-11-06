import { useEffect, useState } from 'react';
import { ArrowUpDown, ChevronDown, MoreHorizontal, PlusCircle, Trash2, Eye  } from 'lucide-react';
import { Button } from './components/ui/button';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from './components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,  } from './components/ui/dialog';
import { Label } from './components/ui/label';
import { Input } from './components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from './components/ui/calendar';
import { DialogClose } from '@radix-ui/react-dialog';
import { Textarea } from './components/ui/textarea';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Checkbox } from './components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay } from './components/ui/alert-dialog';
import { AlertDialogAction, AlertDialogCancel, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog';
import CreateProjectForm from './components/createProject/createProject';
import { Separator } from './components/ui/separator';


export type Project = {
  id: string
  externalId: string,
  name: string,
  department: string,
  requester: string,
  // description: string,
  status: "In Progress" | "Backlog" | "Declined" | "Completed" | "On Hold",
  // goal: string,
  impactStakeholders: boolean,
  // complexity: "High" | "Medium" | "Low",
  // monthlyRequests: number,
  // averageTimeSpent: number,
  // monthlyMinutesSaved: number,
  // financialGain: string,
  // rangeOfGain: string,
  priorityLevel: number,
  requestDate: Date,
  // createdAt: Date,
  // updatedAt: Date
}

interface CreateProject {
  name: string
  department: string
  requester: string
  description: string
  objective: string
  impactsStakeholders: boolean
  complexity: 'High' | 'Medium' | 'Low'
  monthlyRequests: number
  averageTime: number
  requestDate: Date | undefined
}

export function App() {
  const columns: ColumnDef<Project>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    // {
    //   accessorKey: "externalId",
    //   header: "ID Externo",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("externalId")}</div>
    //   ),
    // },
    {
      accessorKey: "externalId",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID Externo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("externalId")}</div>,
    },
    // {
    //   accessorKey: "requestDate",
    //   header: "Data da Solicitação",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("requestDate")}</div>
    //   ),
    // },
    {
      accessorKey: "requestDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Data da Solicitação
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("requestDate")}</div>,
    },
    // {
    //   accessorKey: "name",
    //   header: "Projeto",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("name")}</div>
    //   ),
    // },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Projeto
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    // {
    //   accessorKey: "department",
    //   header: "Departamento",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("department")}</div>
    //   ),
    // },
    {
      accessorKey: "department",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Departamento
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("department")}</div>,
    },
    // {
    //   accessorKey: "requester",
    //   header: "Solicitante",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("requester")}</div>
    //   ),
    // },
    {
      accessorKey: "requester",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Solicitante
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("requester")}</div>,
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("status")}</div>
    //   ),
    // },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
    },
    // {
    //   accessorKey: "priorityLevel",
    //   header: "Prioridade",
    //   cell: ({ row }) => (
    //     <div className="capitalize">{row.getValue("priorityLevel")}</div>
    //   ),
    // },
    {
      accessorKey: "priorityLevel",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Prioridade
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("priorityLevel")}</div>,
    },
    {
      id: "actions",
      header: "Ações",
      enableHiding: false,
      cell: ({ row }) => {
        const project = row.original

        const handleDelete = async () => {
          try {
            const response = await fetch(`https://project-management-wobh.onrender.com/project/${project.id}`, {
              method: 'DELETE',
            });
      
            if (response.ok) {
              // Se a resposta for bem-sucedida, faça algo como atualizar a lista de projetos
              deleteProjectFromList(project.id)
              
              // alert('Projeto deletado com sucesso!');
              // Aqui você pode atualizar o estado da lista de projetos, se necessário
            } else {
              // Caso ocorra um erro na requisição
              alert('Erro ao deletar o projeto.');
            }
          } catch (error) {
            // Caso haja algum erro na requisição
            alert('Erro ao realizar a requisição de exclusão.');
            console.error(error);
          }
        };

        return (
          <div className="flex items-center">
            <Button variant="ghost" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4"></Eye>
            </Button>

            <Separator className='h-5' orientation='vertical'/>

            <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Trash2 className="h-4 w-4"></Trash2>
              </Button>
            </AlertDialogTrigger>


            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza que deseja excluir este projeto?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 text-white hover:bg-red-700" onClick={handleDelete}>Confirmar</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </div>
        )

        // return (
        //   <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //       <Button variant="ghost" className="h-8 w-8 p-0">
        //         <span className="sr-only">Open menu</span>
        //         <MoreHorizontal className="h-4 w-4" />
        //       </Button>
        //     </DropdownMenuTrigger>
          
        //     <DropdownMenuContent align="end">
        //       <DropdownMenuLabel>Ações</DropdownMenuLabel>
        //       <DropdownMenuSeparator />
        //       <DropdownMenuItem>Visualizar</DropdownMenuItem>
        //       <AlertDialog>
        //         <AlertDialogTrigger asChild>
        //           <DropdownMenuItem>Excluir</DropdownMenuItem>
        //         </AlertDialogTrigger>
        //         <AlertDialogContent>
        //           <AlertDialogHeader>
        //             <AlertDialogTitle>Você tem certeza que deseja excluir este projeto?</AlertDialogTitle>
        //             <AlertDialogDescription>
        //               Esta ação não poderá ser desfeita.
        //             </AlertDialogDescription>
        //           </AlertDialogHeader>
        //           <AlertDialogFooter>
        //             <AlertDialogCancel>Cancelar</AlertDialogCancel>
        //             <AlertDialogAction>Confirmar</AlertDialogAction>
        //           </AlertDialogFooter>
        //         </AlertDialogContent>
        //       </AlertDialog>
        //     </DropdownMenuContent>
        //   </DropdownMenu>
        // )
      },
    },
  ]

  const [data, setData] = useState([]);
  const [date, setDate] = useState<Date>()
  // const [open, setOpen] = useState(false);

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const deleteProjectFromList = (projectId: string) => {
    setData((prevProjects) => prevProjects.filter((project: Project) => project.id !== projectId));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-management-wobh.onrender.com/project?page=1&itemsPage=1000000');
        const result = await response.json();
        setData(result.projects);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider>
      <div className="flex items-center justify-between space-y-8">
        <h1 className="text-3xl font-bold">Projetos</h1>
        <ModeToggle />
      </div>

      {/*  */}

      <div className="w-full">
        <div className="flex items-center py-4">

        <div className='flex items-center justify-between'>
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className='w-4 h-4 mr-2'/>
                  Novo projeto
              </Button>
            </DialogTrigger>
      
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo projeto</DialogTitle>
                <DialogDescription>Criar um novo projeto no sistema</DialogDescription>
              </DialogHeader>

            <form className='space-y-4'>
              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Projeto</Label>
                <Input className='col-span-3' id='name' placeholder='Nome do projeto'></Input>
              </div>
              
              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Departamento</Label>
                <Input className='col-span-3' id='name' placeholder='Nome do departamento'></Input>
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Solicitante</Label>
                <Input className='col-span-3' id='name' placeholder='Nome do solicitante'></Input>
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Descrição</Label>
                <Textarea placeholder='Descreva o seu projeto' className='col-span-3'/>
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Objetivo</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder='Selecione o objetivo do projeto'/>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value='Reduzir volume de atendimento'>Reduzir volume de atendimento</SelectItem>
                    <SelectItem value='Reduzir volume de trabalhos repetitivos'>Reduzir volume de trabalhos repetitivos</SelectItem>
                    <SelectItem value='Melhoria da satisfação do cliente'>Melhoria da satisfação do cliente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Impacta Stakeholders</Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder='O projeto impacta clientes e/ou parceiros'/>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value='true'>Sim</SelectItem>
                    <SelectItem value='false'>Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Complexidade</Label>
                <Select>
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
                <Label htmlFor='name'>Número de Solicitações Mensais</Label>
                <Input className='col-span-3' id='name' placeholder='Número de solicitações mensais recebidas'></Input>
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Tempo Médio Gasto</Label>
                <Input className='col-span-3' id='name' placeholder='Tempo médio gasto em minutos'></Input>
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
                      onSelect={setDate}
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
          </Dialog> */}
          <CreateProjectForm/>
        </div>
          
          <Input
            placeholder="Filtrar projetos..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm ml-4 m4-4"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className='text-center' key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className='p-1 border text-center' key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
