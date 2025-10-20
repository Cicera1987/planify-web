"use client";

import React from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

registerLocale("pt-BR", ptBR);

interface DatePickerProps {
    selectedDates: string[];
    setSelectedDates: (dates: string[]) => void;
}

export default function CustomDatePicker({ selectedDates, setSelectedDates }: DatePickerProps) {

    const handleSelect = (dates: Date | null) => {
        if (!dates) return;

        const localDate = dates.toISOString().split("T")[0];

        let updatedDates: string[];
        if (selectedDates.includes(localDate)) {
            updatedDates = selectedDates.filter(date => date !== localDate);
        } else {
            updatedDates = [...selectedDates, localDate];
        }

        setSelectedDates(updatedDates);
    };



    return (
        <div className="date-picker-container">
            <label className="date-picker-label">
                Escolha a melhor data para o atendimento
            </label>
            <DatePicker
                locale="pt-BR"
                inline
                onSelect={handleSelect}
                dayClassName={(date) => {
                    const localDate = date.toISOString().split("T")[0];
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    if (selectedDates.includes(localDate)) return "custom-selected-day";
                    if (date < today) return "custom-disabled-day";
                    return "";
                }}
                renderCustomHeader={({
                    date,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="custom-header">
                        <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>‹</button>
                        <span>
                            {date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
                                .replace(" de ", " ")
                                .replace(/^\w/, (c) => c.toUpperCase())}
                        </span>
                        <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>›</button>
                    </div>
                )}
            />
        </div>
    );
}
