import { type ComponentPropsWithoutRef } from "react";

type FlattenKeys<
  T extends Record<string, unknown>,
  Key = keyof T
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${FlattenKeys<T[Key]>}`
    : T[Key] extends Array<infer U>
    ? U extends Record<string, unknown>
      ? `${Key}.${number}.${FlattenKeys<U>}`
      : never
    : `${Key}`
  : never;

export type SelectOption<TOption> = {
  [Key in keyof TOption]: TOption[Key];
};

/* By */
type SelectByPrimitiveType = string | number;

type SelectByPrimitiveKeys<TOption extends SelectOption<TOption>> = {
  [Key in keyof TOption]: TOption[Key] extends SelectByPrimitiveType
    ? Key
    : never;
}[keyof TOption];

export type SelectBy<TOption extends SelectOption<TOption>> =
  | SelectByPrimitiveKeys<TOption>
  | undefined;

/* Search */
type SelectSearch<TOption extends SelectOption<TOption>> =
  | boolean
  | ((props: TOption) => string);

/* Render */
type SelectRender<TOption extends SelectOption<TOption>> =
  | FlattenKeys<TOption>
  | ((props: TOption) => React.ReactNode);

/* Value */
type SelectValue<
  TOption extends SelectOption<TOption>,
  TBy extends SelectBy<TOption>,
  TMulti extends boolean
> = TMulti extends true
  ? SelectMultiValue<TOption, TBy>
  : SelectSingleValue<TOption, TBy>;

type SelectMultiValue<
  TOption extends SelectOption<TOption>,
  TBy extends SelectBy<TOption>
> = TBy extends keyof TOption ? TOption[TBy][] : TOption[];

type SelectSingleValue<
  TOption extends SelectOption<TOption>,
  TBy extends SelectBy<TOption>
> = TBy extends undefined
  ? TOption | null
  : TBy extends keyof TOption
  ? TOption[TBy] | null
  : never;

/* Select */
export type SelectProps<
  TOption extends SelectOption<TOption> = SelectOption<unknown>,
  TBy extends SelectBy<TOption> = undefined,
  TMulti extends boolean = false
> = SelectControllerProps<TOption, TBy, TMulti> &
  SelectButtonProps &
  SelectMiscProps;

export type SelectControllerProps<
  TOption extends SelectOption<TOption> = SelectOption<unknown>,
  TBy extends SelectBy<TOption> = undefined,
  TMulti extends boolean = false
> = {
  options?: TOption[];
  value: SelectValue<TOption, TBy, TMulti>;
  onChange: (value: SelectValue<TOption, TBy, TMulti>) => void;
  by?: TBy extends undefined ? SelectBy<TOption> : TBy;
  multiple?: TMulti extends false ? boolean : TMulti;
  search?: SelectSearch<TOption>;
  render?: SelectRender<TOption>;
  renderValue?: SelectRender<TOption>;
  closeOnSelect?: boolean;
};

export type SelectMiscProps = {
  isLoading?: boolean;
};

type SelectPropKeys = keyof SelectControllerProps;

type SelectButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  SelectPropKeys
>;

export type SelectSettings = {
  defaultRender?: string[];
};
