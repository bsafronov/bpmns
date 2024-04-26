import { useEffect, useMemo } from "react";
import { renderToString } from "react-dom/server";
import { useBoolean } from "usehooks-ts";
import { selectSettings } from "./settings";
import { SelectBy, SelectControllerProps, SelectOption } from "./types";

type Option = Record<string, unknown>;
type PrimitiveValue = string | number;
type SingleValue = Option | string | number;
type Value = SingleValue | SingleValue[] | null;
type Search = boolean | ((option: Option) => string) | undefined;
type By = string | undefined;
type Render = string | ((option: Option) => React.ReactNode) | undefined;
type Multiple = boolean | undefined;
type OnChange = (value: Value) => void;

export function useSelect<
  TOption extends SelectOption<TOption>,
  TBy extends SelectBy<TOption> = undefined,
  TMulti extends boolean = false
>(props: SelectControllerProps<TOption, TBy, TMulti>) {
  /* NARROWING PROP TYPES */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = (props.options ?? []) as Option[];
  const value = props.value as Value;
  const search = props.search as Search;
  const by = props.by as By;
  const multiple = props.multiple as Multiple;
  const render = props.render as Render;
  const renderValue = props.renderValue as Render;
  const onChange = props.onChange as OnChange;
  /* NARROWING PROP TYPES END*/

  const { value: mounted, setTrue: setMounted } = useBoolean();
  const { value: open, toggle: toggleOpen } = useBoolean();

  useEffect(() => {
    setMounted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted) return;
    onChange(Array.isArray(value) ? [] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiple, by]);

  const optionsByMap = useMemo(() => {
    if (!by) return null;

    const optionsMapArr = options.map((option) => {
      if (!(by in option)) throw Error("Invalid by key");

      const primitiveValue = option[by];

      if (!isPrimitive(primitiveValue)) throw Error("Invalid by key");

      return [primitiveValue, option];
    });

    return Object.fromEntries(optionsMapArr) as Record<keyof Option, Option>;
  }, [options, by]);

  const getValue = () => value;
  const getOptions = () => options;
  const getRenderValueType = () => typeof renderValue;

  function getOptionByProperty(option: Option): PrimitiveValue {
    if (!by || !(by in option)) {
      throw Error("Invalid by key");
    }

    const value = option[by];

    if (!isPrimitive(value)) {
      throw Error("Invalid by key");
    }

    return value;
  }

  function handleClearValue() {
    if (Array.isArray(value)) {
      return onChange([]);
    }

    return onChange(null);
  }

  function isOptionSelected(option: Option): boolean {
    if (!value) {
      return false;
    }

    if (isPrimitiveArrayValue(value)) {
      const prop = getOptionByProperty(option);
      return value.includes(prop);
    }

    if (isRecordArrayValue(value)) {
      return value.includes(option);
    }

    if (isRecord(value)) {
      return option === value;
    }

    if (isPrimitive(value)) {
      const prop = getOptionByProperty(option);
      return prop === value;
    }

    return false;
  }

  function handleOnChange(option: Option): void {
    if (isOptionSelected(option)) {
      return onDeleteOption(option);
    }

    return onAddOption(option);
  }

  function onChangeWithConditions(value: Value) {
    onChange(value);
    if (props.closeOnSelect ?? (!props.closeOnSelect && !props.multiple)) {
      return toggleOpen();
    }
  }

  function onAddOption(option: Option): void {
    if (isPrimitiveArrayValue(value)) {
      const updatedValue = [...value, getOptionByProperty(option)];
      return onChangeWithConditions(updatedValue);
    }

    if (isRecordArrayValue(value)) {
      const updatedValue = [...value, option];
      return onChangeWithConditions(updatedValue);
    }

    if (isRecordValue(value)) {
      return onChangeWithConditions(option);
    }

    if (isPrimitiveValue(value)) {
      return onChangeWithConditions(getOptionByProperty(option));
    }
  }

  function onDeleteOption(option: Option): void {
    if (isPrimitiveValue(value) || isRecordValue(value)) {
      return onChangeWithConditions(null);
    }

    if (isPrimitiveArrayValue(value)) {
      const updatedValue = value.filter(
        (v) => v !== getOptionByProperty(option)
      );
      return onChangeWithConditions(updatedValue);
    }

    if (isRecordArrayValue(value)) {
      const updatedValue = value.filter((v) => v !== option);
      return onChangeWithConditions(updatedValue);
    }
  }

  function getSearchValue(option: Option, index: number): string {
    if (!search) {
      return index.toString();
    }

    if (typeof search === "function") {
      return search(option);
    }

    const node = getRenderOption(option);
    const stringNode = renderToString(node);
    const content = stringNode.replace(/<[^>]+>/g, "");
    return content;
  }

  function getRenderOptionDefault(option: Option): React.ReactNode {
    if (!selectSettings.defaultRender) return JSON.stringify(option);

    for (const label of selectSettings.defaultRender) {
      if (label in option) {
        const value = option[label];
        if (isPrimitive(value)) {
          return value;
        }
      }
    }

    return JSON.stringify(option);
  }

  function getRenderOption(option: Option): React.ReactNode {
    if (!render) {
      return getRenderOptionDefault(option);
    }

    if (typeof render === "string") {
      return getNestedOptionProperty(option, render);
    }

    return render(option);
  }

  function getRenderValue(optionValue: SingleValue): React.ReactNode {
    let option = optionValue;

    if (isPrimitive(optionValue) && optionsByMap) {
      option = optionsByMap[optionValue];
    }

    if (!isRecord(option)) return null;

    if (!renderValue) {
      return getRenderOptionDefault(option);
    }

    if (typeof renderValue === "string") {
      return getNestedOptionProperty(option, renderValue);
    }

    if (typeof renderValue === "function") {
      return renderValue(option);
    }
  }

  function getNestedOptionProperty(
    option: Option,
    key: string
  ): React.ReactNode {
    const keysArr = key.split(".");
    let value: Option | string | number = option;

    keysArr.forEach((key) => {
      if (isRecord(value) && key in value) {
        return (value = value[key] as string | number | Option);
      }

      throw Error("Invalid key");
    });

    return `${value}`;
  }

  /* HELPERS */

  function isPrimitiveArrayValue(value: unknown): value is PrimitiveValue[] {
    return (by && multiple) ?? isPrimitiveArray(value) ? true : false;
  }

  function isPrimitiveValue(value: unknown): value is PrimitiveValue {
    return (by && !multiple) ?? isPrimitive(value) ? true : false;
  }

  function isRecordValue(value: unknown): value is Option {
    return (!by && !multiple) ?? isRecord(value) ? true : false;
  }

  function isRecordArrayValue(value: unknown): value is Option[] {
    return (!by && multiple) ?? isRecordArray(value) ? true : false;
  }
  /* HELPERS END */

  return {
    isOptionSelected,
    getOptions,
    getSearchValue,
    getRenderOption,
    getRenderValue,
    handleOnChange,
    getValue,
    getRenderValueType,
    handleClearValue,
    open,
    toggleOpen,
  };
}

/* HELPERS */
function isPrimitive(value: unknown): value is PrimitiveValue {
  return typeof value === "string" || typeof value === "number";
}

function isPrimitiveArray(value: unknown): value is PrimitiveValue[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    value.every((v) => isPrimitive(v))
  );
}

function isRecord(value: unknown): value is Option {
  return typeof value === "object" && value !== null;
}

function isRecordArray(value: unknown): value is Option[] {
  return (
    Array.isArray(value) && value.length > 0 && value.every((v) => isRecord(v))
  );
}
/* HELPERS */
