import type { CalendarDay } from "../services/calendarService"

export interface CardHour {
  dayOfWeek: string
  day: number
  month: string
  year: number
  hours: { time: string; available: boolean } [];
  fullDate: string
}

export const formatCalendarDaysToCardHours = (calendarDays: CalendarDay[]): CardHour[] => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return calendarDays
    .map((days) => {
      const [year, month, day] = days.localDate.split("-").map(Number)
      const date = new Date(year, month - 1, day)

      const dayOfWeek = date
        .toLocaleDateString("pt-BR", { weekday: "short" })
        .replace(/\.$/, "")
        .replace(/^./, (c) => c.toUpperCase())

      const monthName = date
        .toLocaleDateString("pt-BR", { month: "short" })
        .replace(/^./, (c) => c.toUpperCase())

      return {
        dayOfWeek,
        day: date.getDate(),
        month: monthName,
        year: date.getFullYear(),
        hours: days.times.map(hour => ({
          time: hour.time.slice(0, 5),
          available: hour.available,
        })),
        fullDate: `${days.localDate}T00:00:00`,
      }
    })
    .filter((card) => {
      const cardDate = new Date(card.fullDate)
      cardDate.setHours(0, 0, 0, 0)
      return cardDate >= today
    })
    .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())
}
