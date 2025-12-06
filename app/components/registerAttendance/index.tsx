"use client"

import type React from "react"
import { useState, useMemo, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/app/store/store"
import { Controller, useForm } from "react-hook-form"
import { toast } from "react-toastify"

import { formatPhone } from "@/app/utils/formatPhone"
import { formatHour } from "@/app/utils/formatHours"
import { formatCalendarDaysToCardHours } from "@/app/utils/formatDataCalendar"
import { getCalendar } from "@/app/services/calendarService"
import { createScheduling } from "@/app/services/schedulingService"
import { setCalendarList } from "@/app/store/features/calendarSlice"
import { useJobs } from "@/app/hooks/useJobs"
import { usePackages } from "@/app/hooks/usePackages"

import Icon from "../assets/icons"
import Button from "../buttons"
import Input from "../inputs"
import OpeningHours from "../card/openingHours"
import CalendarContent from "../content/calendar/page"

import "./styles.css"
import Image from "next/image"
import { externalImageLoader } from "@/app/utils/externalImageLoader"
import { useRouter } from "next/navigation"

interface ItemsTag {
  id: string | number
  label?: string
  quantity: number
}

interface ContactData {
  id: number
  name: string
  phone: string
  email?: string
  gender?: string
  imageUrl?: string
  packageIds?: number[]
  services?: Array<{ id: number; name: string }>
}

interface RegisterAttendanceProps {
  contactDataId: ContactData | null
  isLoading?: boolean
}

export const RegisterAttendance: React.FC<RegisterAttendanceProps> = ({ contactDataId }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const calendarDays = useSelector((state: RootState) => state.calendar.list)
  const { packages } = usePackages()
  const { fetchJobs, jobList } = useJobs()
  const [selectedTime, setSelectedTime] = useState < { date: string; time: string } | null > (null)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm < { services: { id: number }[] } > ({
    defaultValues: { services: [] },
  })

  const clientPackage = useMemo(() => {
    const id = contactDataId?.packageIds?.[0]
    return id ? packages.find((p) => p.id === id) ?? null : null
  }, [contactDataId, packages])

  const jobOptions = useMemo(() => {
    const source = clientPackage?.services?.length ? clientPackage.services : jobList
    return source.map((s) => ({ label: s.name, value: s.id }))
  }, [clientPackage, jobList])

  const cardHours = useMemo(() => formatCalendarDaysToCardHours(calendarDays), [calendarDays])

  useEffect(() => {
    (async () => {
      try {
        const [calendarData] = await Promise.all([getCalendar(), fetchJobs()]);
        dispatch(setCalendarList(calendarData));
      } catch {
        toast.error("Erro ao carregar dados");
      }
    })();
  }, [dispatch, fetchJobs]);

  const onSubmit = async (data: { services: { id: number }[] }) => {
    if (!selectedTime) return toast.error("Selecione uma data e horário para o agendamento.")

    try {
      const selectedDate = new Date(selectedTime.date).toISOString().split("T")[0]
      const calendarDay = calendarDays.find((day) => day.localDate === selectedDate)
      const timeObj = calendarDay?.times.find(
        (hour: { id: number; time: string }) => hour.time.slice(0, 5) === selectedTime.time.slice(0, 5),
      )

      if (!calendarDay || !timeObj) return toast.error("Data ou horário inválido!")
      
      if (!contactDataId?.id) {
        return toast.error("Contato inválido!");
      }
      await createScheduling({
        contactId: contactDataId.id,
        serviceId: data.services.map((s) => s.id),
        packageId: clientPackage?.id,
        calendarDayId: calendarDay.id,
        calendarTimeId: timeObj.id,
      })

      toast.success("Agendamento criado com sucesso!")
      router.push(`/contact/${contactDataId?.id}/schedule`)
    } catch (err:any) {
      console.error(err)
      toast.error(err.message)
    }
  }

  return (
    <form className="attendance-contact scroll-box" onSubmit={handleSubmit(onSubmit)}>
      <div className="session-attendance session-client-attendance">
        <p className="client-title-attendance">Agendar atendimento</p>

        <div className="client-info-attendance">
          {contactDataId?.imageUrl && (
            <Image
              loader={externalImageLoader}
              src={contactDataId.imageUrl || "/placeholder.svg"}
              alt={contactDataId.name}
              className="client-image-attendance"
              width={70}
              height={70}
            />
          )}
          <div>
            <span className="client-name-attendance">{contactDataId?.name}</span>
            <span className="client-description-attendance">
              <p className="contact-title-attendance">E-mail:</p>
              {contactDataId?.email}
            </span>
            <span className="client-description-attendance">
              <p className="contact-title-attendance">WhatsApp:</p>
              {formatPhone(contactDataId?.phone || "")}
            </span>
          </div>
        </div>

        {contactDataId?.gender && (
          <p className="client-gender-attendance">
            {contactDataId.gender.charAt(0).toUpperCase() + contactDataId.gender.slice(1).toLowerCase()}
          </p>
        )}
      </div>

      <OpeningHours
        title="Próximos dias disponíveis"
        toggleOpen={<Icon.infoSchedule />}
        cardHours={cardHours}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        triggerContent={
          <CalendarContent
            mode="schedule"
            onSelectTime={({ date, time }) => setSelectedTime({ date: new Date(date).toISOString(), time })}
          />
        }
      />

      {clientPackage && (
        <div className="client-package-wrapper">
          <span className="client-package-tag">{clientPackage.name}</span>
        </div>
      )}
      <Controller
        name="services"
        control={control}
        rules={{ required: "Selecione pelo menos um serviço" }}
        render={({ field, fieldState }) => (
          <Input.MultSelectTag
            label="Procedimentos"
            options={jobOptions}
            value={
              field.value?.map((item) => ({
                id: item.id,
                label: jobOptions.find((opt) => opt.value === item.id)?.label || "",
                quantity: 1,
              })) || []
            }
            onChange={(values) => field.onChange(values.map((v: ItemsTag) => ({ id: Number(v.id) })))}
            placeholder="Selecione"
            required
            showQuantity={false}
            error={fieldState.error?.message}
          />
        )}
      />
      {selectedTime && (
        <div className="chosen-info">
          <p>
            <strong>Data:</strong>{" "}
            {new Date(selectedTime.date).toLocaleDateString("pt-BR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p>
            <strong>Horário:</strong> {formatHour(selectedTime.time)}h
          </p>
        </div>
      )}
      <div className="attendance-footer">
        <Button.ButtonVariant
          type="submit"
          variant="filled"
          text={isSubmitting ? "Agendando..." : "Agendar"}
          disabled={isSubmitting || !selectedTime}
        />
      </div>
    </form>
  )
}