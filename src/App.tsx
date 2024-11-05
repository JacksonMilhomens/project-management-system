import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
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

export function App() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://project-management-wobh.onrender.com/project');
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
      <div className='p-6 max-w-6xl mx-auto space-y-4'>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projetos</h1>
          <ModeToggle />
        </div>

        <div className='flex items-center justify-between'>
          <Dialog>
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
          </Dialog>
        </div>

        <div className='border rounded-lg p-2'>
          <Table className='border-separate border-spacing-0 border-spacing-x-6'>
            <TableHeader>
              <TableHead>ID Externo</TableHead>
              <TableHead>Data da Solicitação</TableHead>
              <TableHead>Projeto</TableHead>
              <TableHead>Departamento</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prioridade</TableHead>
            </TableHeader>
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.externalId}</TableCell>
                  <TableCell>{item.requestDate}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.requester}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.priorityLevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
    </ThemeProvider>
  );
}


// "use client"

// import * as React from "react"
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table"
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"
// import { ThemeProvider } from "./components/theme-provider"
// import { ModeToggle } from "./components/mode-toggle"

// const data: Payment[] = [
//   {
//     id: "m5gr84i9",
//     amount: 316,
//     status: "success",
//     email: "ken99@yahoo.com",
//   },
//   {
//     id: "3u1reuv4",
//     amount: 242,
//     status: "success",
//     email: "Abe45@gmail.com",
//   },
//   {
//     id: "derv1ws0",
//     amount: 837,
//     status: "processing",
//     email: "Monserrat44@gmail.com",
//   },
//   {
//     id: "5kma53ae",
//     amount: 874,
//     status: "success",
//     email: "Silas22@gmail.com",
//   },
//   {
//     id: "bhqecj4p",
//     amount: 721,
//     status: "failed",
//     email: "carmella@hotmail.com",
//   },
// ]

// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

// export const columns: ColumnDef<Payment>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Email
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
//   },
//   {
//     accessorKey: "amount",
//     header: () => <div className="text-right">Amount</div>,
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("amount"))

//       // Format the amount as a dollar amount
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount)

//       return <div className="text-right font-medium">{formatted}</div>
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       )
//     },
//   },
// ]

// export function App() {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [rowSelection, setRowSelection] = React.useState({})

//   const table = useReactTable({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })

//   return (
//     <ThemeProvider>
//       <div className="flex items-center justify-between">
//         <h1 className="text-3xl font-bold">Projetos</h1>
//         <ModeToggle />
//       </div>

//       <div className="w-full">
//         <div className="flex items-center py-4">
//           <Input
//             placeholder="Filter emails..."
//             value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
//             onChange={(event) =>
//               table.getColumn("email")?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   )
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               {table.getHeaderGroups().map((headerGroup) => (
//                 <TableRow key={headerGroup.id}>
//                   {headerGroup.headers.map((header) => {
//                     return (
//                       <TableHead key={header.id}>
//                         {header.isPlaceholder
//                           ? null
//                           : flexRender(
//                               header.column.columnDef.header,
//                               header.getContext()
//                             )}
//                       </TableHead>
//                     )
//                   })}
//                 </TableRow>
//               ))}
//             </TableHeader>
//             <TableBody>
//               {table.getRowModel().rows?.length ? (
//                 table.getRowModel().rows.map((row) => (
//                   <TableRow
//                     key={row.id}
//                     data-state={row.getIsSelected() && "selected"}
//                   >
//                     {row.getVisibleCells().map((cell) => (
//                       <TableCell key={cell.id}>
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={columns.length}
//                     className="h-24 text-center"
//                   >
//                     No results.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         <div className="flex items-center justify-end space-x-2 py-4">
//           <div className="flex-1 text-sm text-muted-foreground">
//             {table.getFilteredSelectedRowModel().rows.length} of{" "}
//             {table.getFilteredRowModel().rows.length} row(s) selected.
//           </div>
//           <div className="space-x-2">
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               Next
//             </Button>
//           </div>
//         </div>
//       </div>
//     </ThemeProvider>
//   )
// }
