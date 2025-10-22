"use client"

import React, { useRef, useState, MouseEvent, ReactNode, ReactElement } from "react"
import "./styles.css"
import Icon from "../../assets/icons"
import Button from "../../buttons"
import { formatDisplayDate } from "@/app/utils/formatDates"

interface HourCard {
  dayOfWeek: string
  day: number
  month: string
  year: number
  hours: string[]
  fullDate: string
}

interface SelectedTime {
  date: string
  time: string
}

interface TriggerContentProps {
  selectedTime: SelectedTime | null
  setSelectedTime: React.Dispatch<React.SetStateAction<SelectedTime | null>>
}

interface Props {
  title: string
  toggleOpen: ReactNode
  cardHours: HourCard[]
  triggerContent?: React.ReactElement<TriggerContentProps>
  selectedTime?: SelectedTime | null
  setSelectedTime?: React.Dispatch<React.SetStateAction<SelectedTime | null>>
  onConfirm?: (slot: SelectedTime | null) => void
}


export default function OpeningHours({
  title,
  toggleOpen,
  cardHours,
  triggerContent,
  selectedTime,
  setSelectedTime,
  onConfirm,
}: Props) {
  const [expandedDate, setExpandedDate] = useState < string | null > (null)
  const [isOpen, setIsOpen] = useState(false)
  const [internalSelectedTime, setInternalSelectedTime] = useState < {
    date: string,
    time: string
  } | null > (null)

  const time = selectedTime ?? internalSelectedTime
  const updateTime = setSelectedTime ?? setInternalSelectedTime

  const scrollContainerRef = useRef <HTMLDivElement > (null)

  const handleCardClick = (cardDate: string, event?: MouseEvent) => {
    event?.stopPropagation?.()
    const container = scrollContainerRef.current
    if (!container) return

    const cardIndex = cardHours.findIndex((card) => card.fullDate === cardDate)
    if (cardIndex === -1) return

    const cardElement = container.children[cardIndex] as HTMLElement

    if (cardElement) {
      const containerRect = container.getBoundingClientRect()
      const cardRect = cardElement.getBoundingClientRect()
      const scrollLeft = cardRect.left - containerRect.left + container.scrollLeft - 44

      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      })
    }
  }

  const toggleExpand = (cardDate: string, e: MouseEvent) => {
    e.stopPropagation()
    setExpandedDate(expandedDate === cardDate ? null : cardDate)
  }

  const handleConfirmTime = () => {
    if (onConfirm) onConfirm(time)
    setIsOpen(false)
  }

  const isHourSelected = (card: HourCard, hour: string) => {
    if (!time?.date) return false
    const selected = new Date(time.date)
    const cardDate = new Date(card.fullDate)
    return (
      selected.getFullYear() === cardDate.getFullYear() &&
      selected.getMonth() === cardDate.getMonth() &&
      selected.getDate() === cardDate.getDate() &&
      time.time === hour
    )
  }

  const handleSelectHour = (card: HourCard, hour: string) => {
    updateTime({
      date: new Date(card.fullDate).toISOString(),
      time: hour,
    })
  }

  return (
    <div className="opening-hours-container">
      <div className="opening-hours-header">
        <h4 className="opening-hours-title">{title}</h4>
        <div className="opening-hours-trigger" onClick={() => setIsOpen((prev) => !prev)}>
          {toggleOpen}
        </div>
      </div>

      <div className="opening-hours-cards" ref={scrollContainerRef}>
        {cardHours.map((card) => {
          const isExpanded = expandedDate === card.fullDate
          const visibleHours = isExpanded ? card.hours : card.hours.slice(0, 3)

          return (
            <div
              key={card.fullDate}
              className={`opening-card ${isExpanded ? "expanded" : ""}`}
              onClick={() => handleCardClick(card.fullDate)}
            >
              <p className="opening-card-date">
                {card.dayOfWeek}. {card.day} {card.month}
              </p>

              <div className="opening-card-hours">
                {visibleHours.map((hour) => (
                  <span
                    key={hour}
                    className={`opening-hour-tag ${isHourSelected(card, hour) ? "opening-hour-tag--selected" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSelectHour(card, hour)
                    }}
                  >
                    {hour}
                  </span>
                ))}

                {card.hours.length > 3 && (
                  <span className="opening-hour-extra" onClick={(e) => toggleExpand(card.fullDate, e)}>
                    {isExpanded ? "–" : `+${card.hours.length - 3}`}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {isOpen && (
        <div className="opening-hours-popup" onClick={() => setIsOpen(false)}>
          <div className="opening-hours-popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="opening-hours-close" onClick={() => setIsOpen(false)}>
              <Icon.Close />
            </button>
            
            {triggerContent &&
              React.cloneElement(triggerContent, {
                selectedTime: selectedTime ?? null,
                setSelectedTime: setSelectedTime,
              })}

            {time && (
              <div className="chosen-info" style={{ marginTop: "16px" }}>
                <p>
                  <strong>Data:</strong> {formatDisplayDate(time.date)}
                </p>
                <p>
                  <strong>Horário:</strong> {time.time}h
                </p>
              </div>
            )}

            <div style={{ marginTop: "16px", textAlign: "right" }}>
              <Button.ButtonVariant
                type="button"
                variant="filled"
                text="Marcar atendimento"
                onClick={handleConfirmTime}
                disabled={!time}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}