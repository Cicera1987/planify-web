import { FieldValues, Path, UseFormSetValue } from "react-hook-form";

export default function mask() {
  const formatCurrency = (value: string | number) => {
    if (!value && value !== 0) return "";
    const num = Number(value.toString().replace(/\D/g, "")) / 100;
    if (isNaN(num)) return "";
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };
  const formatCurrencyInput = <T extends FieldValues>(
    e: React.ChangeEvent<HTMLInputElement>,
    setValue: UseFormSetValue<T>,
    fieldName: Path<T>,
  ) => {
    const numericOnly = e.target.value.replace(/\D/g, "");
    const num = Number(numericOnly) / 100;

    e.target.value = num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    setValue(fieldName, num as T[keyof T], { shouldValidate: true });
  };

  const parseCurrency = (value: string | number) => {
    if (!value && value !== 0) return 0;
    let cleaned = value.toString().replace(/[^\d,.-]/g, "");
    cleaned = cleaned.replace(",", ".");

    const num = Number(cleaned);
    return isNaN(num) ? 0 : num;
  };

  return {
    formatCurrency,
    formatCurrencyInput,
    parseCurrency,
  };
}
