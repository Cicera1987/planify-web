"use client";

import React, { useEffect, useState, ReactElement } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

import Button from "../../buttons";
import Input from "../../inputs";
import Tag from "../../tags";
import CustomDatePicker from "../../datePicker";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  CalendarRequestDay,
  createCalendarDay,
  deleteTimeFromDay,
  getCalendar,
} from "@/app/services/calendarService";
import { removeTimeFromDayState, setCalendarList, upsertCalendarDay } from "@/app/store/features/calendarSlice";
import { toast } from "react-toastify";
import { formatHours, formatTimeInput, isValidTime } from "@/app/utils/formatHours";

export default function CalendarContent(): ReactElement {
  const { register, watch, setValue, handleSubmit, reset, formState: { errors } } = useForm < { time: string } > ();
  const dispatch = useDispatch();
  const calendarList = useSelector((state: RootState) => state.calendar.list);
  const [selectedDates, setSelectedDates] = useState < string[] > ([]);

  const timeValue = watch("time") || "";

  useEffect(() => {
    async function loadCalendar() {
      const data = await getCalendar();
      dispatch(setCalendarList(data));
    }
    loadCalendar();
  }, [dispatch]);

  const handleDeleteTime = async (dayId: number, timeId: number) => {
    try {
      await deleteTimeFromDay(dayId, timeId);
      dispatch(removeTimeFromDayState({ dayId, timeId }));
      toast.success("Horário removido com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar horário:", error);
      toast.error("Não foi possível deletar o horário. Tente novamente.");
    }
  };

  const getTagItems = () => {
    return selectedDates.flatMap(date => {
      const days = calendarList.find(day => day.localDate === date);
      return (
        days?.times.map(time => ({
          id: time.id,
          name: time.time,
          dayId: days.id,
          timeId: time.id!,
        })) || []
      );
    });
  };

  const onSubmit = async (data: { time: string }) => {
    if (!data.time || selectedDates.length === 0) return;

    const payload: CalendarRequestDay[] = selectedDates.map(date => {
      const existing = calendarList.find(d => d.localDate === date);
      const hasTime = existing?.times.some(t => t.time === data.time);
      return !hasTime ? { localDate: date, times: [{ time: data.time }] } : null;
    }).filter(Boolean) as CalendarRequestDay[];

    if (payload.length === 0) {
      toast.info("O horário já está cadastrado em todos os dias selecionados.");
      return;
    }

    try {
      const newDays = await createCalendarDay(payload);
      newDays.forEach(day => dispatch(upsertCalendarDay(day)));

      toast.success("Horário cadastrado com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao salvar horários:", error);
      toast.error("Não foi possível salvar os horários. Tente novamente.");
    }
  };

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendário</h2>

      <CustomDatePicker
        selectedDates={selectedDates}
        setSelectedDates={setSelectedDates}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="calendar-form">
        <Input.InputForm
          label="Informe a Hora"
          type="text"
          placeholder="00:00"
          maxLength={5}
          {...register("time", {
            required: "Campo obrigatório",
            validate: (value) => isValidTime(value) || "Hora inválida (HH:mm)",
          })}
          required
          value={timeValue}
          onChange={(e) => setValue("time", formatTimeInput(e.target.value))}
        />
        <div className="calendar-events scroll-list">
        <div className="calendar-events-items">
          <Tag.Default
            items={getTagItems()}
            formatItem={item => formatHours(item.name)}
            onDelete={(id) => {
              const item = getTagItems().find(i => i.id === id);
              if (item) handleDeleteTime(item.dayId, item.timeId);
          }}
            />

        </div>
        </div>
        <div className="calendar-footer">
          <Button.ButtonVariant
            type="submit"
            variant="filled"
            text="Cadastrar"
          />
        </div>
      </form>
    </div>
  );
}
