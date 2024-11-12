import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { FormControl } from "./form";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Selecione uma data",
  className,
}: DatePickerProps) {
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(
    value || new Date()
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-[274px] pl-3 text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          >
            {value ? (
              format(value, "dd/MM/yyyy", { locale: ptBR })
            ) : (
              <span>{placeholder}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex gap-2 p-3 border-b">
          <Select
            onValueChange={(month) => {
              const newDate = new Date(
                calendarMonth.getFullYear(),
                parseInt(month),
                1
              );
              setCalendarMonth(newDate);
            }}
            value={calendarMonth.getMonth().toString()}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                  {format(new Date(2024, i, 1), "MMMM", { locale: ptBR })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(year) => {
              const newDate = new Date(
                parseInt(year),
                calendarMonth.getMonth(),
                1
              );
              setCalendarMonth(newDate);
            }}
            value={calendarMonth.getFullYear().toString()}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Ano" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 25 }, (_, i) => (
                <SelectItem
                  key={i}
                  value={(new Date().getFullYear() - i).toString()}
                >
                  {new Date().getFullYear() - i}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          month={calendarMonth}
          onMonthChange={setCalendarMonth}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
