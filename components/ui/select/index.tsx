"use client";

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { Ref, forwardRef } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { SelectBy, SelectMiscProps, SelectOption, SelectProps } from "./types";
import { useSelect } from "./use-select";

function SelectWithoutRef<
  TOption extends SelectOption<TOption> = SelectOption<unknown>,
  TBy extends SelectBy<TOption> = undefined,
  TMulti extends boolean = false
>(
  {
    onChange,
    options,
    value,
    by,
    multiple,
    search,
    render,
    renderValue,
    closeOnSelect,
    isLoading,
    ...buttonProps
  }: SelectProps<TOption, TBy, TMulti>,
  ref?: Ref<HTMLButtonElement>
) {
  const {
    getOptions,
    getRenderOption,
    getRenderValue,
    getSearchValue,
    handleOnChange,
    isOptionSelected,
    getValue,
    getRenderValueType,
    handleClearValue,
    open,
    toggleOpen,
  } = useSelect({
    onChange,
    options,
    value,
    by,
    multiple,
    search,
    render,
    renderValue,
    closeOnSelect,
  });

  return (
    <Popover open={open} onOpenChange={toggleOpen}>
      <PopoverTrigger asChild>
        <SelectValue
          ref={ref}
          open={open}
          getRenderValue={getRenderValue}
          getValue={getValue}
          getRenderValueType={getRenderValueType}
          handleClearValue={handleClearValue}
          isLoading={isLoading}
          {...buttonProps}
        />
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="mt-1 w-[var(--radix-popover-trigger-width)] p-0"
      >
        <Command>
          {search && <CommandInput placeholder="Поиск..." />}
          <CommandList className="p-1">
            {!isLoading && <CommandEmpty>Ничего не найдено...</CommandEmpty>}

            {getOptions().map((option, i) => (
              <CommandItem
                key={i}
                value={getSearchValue(option, i)}
                onSelect={() => handleOnChange(option)}
                className="flex justify-between gap-2"
              >
                <div className="grow truncate">{getRenderOption(option)}</div>
                {isOptionSelected(option) && <Check className="size-4" />}
              </CommandItem>
            ))}
            {isLoading && (
              <div className="flex justify-center py-2">
                <Loader2 className="size-6 animate-spin text-blue-500" />
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type SelectValueProps = React.ComponentPropsWithoutRef<"button"> &
  Pick<
    ReturnType<typeof useSelect>,
    | "getRenderValue"
    | "getValue"
    | "getRenderValueType"
    | "handleClearValue"
    | "open"
  > &
  Pick<SelectMiscProps, "isLoading">;

const SelectValue = forwardRef<React.ElementRef<"button">, SelectValueProps>(
  (
    {
      className,
      getRenderValue,
      getValue,
      getRenderValueType,
      handleClearValue,
      open,
      isLoading,
      ...props
    },
    ref
  ) => {
    const value = getValue();
    const hasValue = value && (Array.isArray(value) ? value.length > 0 : true);

    function getRender(): React.ReactNode {
      if (!hasValue) {
        return <p className="pl-3 text-muted-foreground">Выбрать...</p>;
      }

      if (Array.isArray(value)) {
        return (
          <div className="flex flex-wrap gap-1 pl-2">
            {value.map((v, i) => (
              <div
                key={i}
                className={cn(
                  (getRenderValueType() === "undefined" ||
                    getRenderValueType() === "string") &&
                    "rounded-full border bg-muted px-2"
                )}
              >
                {getRenderValue(v)}
              </div>
            ))}
          </div>
        );
      }

      return <p className="pl-3">{getRenderValue(value)}</p>;
    }

    return (
      <button
        ref={ref}
        className={cn(
          "flex min-h-10 w-full items-stretch rounded-md border bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          open && "ring-2 ring-ring ring-offset-2",
          className
        )}
        {...props}
      >
        <div className="flex grow items-center py-2">{getRender()}</div>
        <div className="flex items-center justify-center space-x-2 px-3">
          {isLoading && (
            <Loader2 className="size-4 animate-spin text-blue-500" />
          )}
          {hasValue ? (
            <div
              role="button"
              onClick={handleClearValue}
              className="text-muted-foreground hover:text-primary"
            >
              <X className="size-4" />
            </div>
          ) : (
            <ChevronsUpDown className="size-4 text-muted-foreground hover:text-primary" />
          )}
        </div>
      </button>
    );
  }
);

SelectValue.displayName = "SelectValue";

// @ts-ignore
export const Select = forwardRef(SelectWithoutRef) as <
  TOption extends SelectOption<TOption> = SelectOption<unknown>,
  TBy extends SelectBy<TOption> = undefined,
  TMulti extends boolean = false
>(
  props: SelectProps<TOption, TBy, TMulti> & {
    ref?: Ref<HTMLButtonElement>;
  }
) => JSX.Element;
