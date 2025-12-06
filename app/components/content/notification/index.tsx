'use client'

import React, { useEffect, useRef, useState } from "react"
import { useContact } from "@/app/hooks/useContact"
import Icon from "@/app/components/assets/icons"
import {
  getNotificationContactIds,
  getNotificationsByContact,
  markNotificationAsRead,
} from "@/app/services/notificationService"
import type { Notifications } from "@/app/services/notificationService"

import "./styles.css"

export default function NotificationAccordion() {
  const [contactIds, setContactIds] = useState < number[] > ([])
  const [notificationsByContact, setNotificationsByContact] = useState < Record < number, Notifications[]>> ({})
  const [openContacts, setOpenContacts] = useState < number[] > ([])
  const panelRefs = useRef < Record < number, HTMLDivElement | null >> ({})
  const [heights, setHeights] = useState < Record < number, string>> ({})
  const { contacts } = useContact()

  // 1. pega IDs dos contatos que possuem notificações
  useEffect(() => {
    getNotificationContactIds().then(setContactIds).catch(() => setContactIds([]))
  }, [])

  // 2. puxa notificações de um contato específico quando ele abrir
  async function loadNotifications(contactId: number) {
    if (notificationsByContact[contactId]) return // se já carregou, vaza

    const list = await getNotificationsByContact(contactId).catch(() => [])
    setNotificationsByContact(prev => ({ ...prev, [contactId]: list }))
  }

  // 3. toggle do acordeon + marcar como lida na lata
  async function toggle(contactId: number) {
    const isOpen = openContacts.includes(contactId)

    if (!isOpen) {
      await loadNotifications(contactId)

      const list = notificationsByContact[contactId] || []
      if (list.length > 0) {
        await Promise.all(list.filter(n => !n.read).map(n =>
          markNotificationAsRead(n.id).catch(() => undefined)
        ))

        setNotificationsByContact(prev => ({
          ...prev,
          [contactId]: list.map(n => ({ ...n, read: true }))
        }))
      }

      setOpenContacts(prev => [...prev, contactId])
    } else {
      setOpenContacts(prev => prev.filter(id => id !== contactId))
    }
  }

  // 4. animação de height suave
  useEffect(() => {
    const mapHeights: Record<number, string> = {}

    contactIds.forEach(id => {
      const el = panelRefs.current[id]
      mapHeights[id] = openContacts.includes(id) && el ? `${el.scrollHeight}px` : "0px"
    })

    setHeights(mapHeights)
  }, [openContacts, notificationsByContact, contactIds])

  if (!contactIds.length) return <p className="p-4 text-center">Zero notificações cadastradas ainda.</p>

  return (
    <div className="notification-wrapper">
      <h2 className="notification-title">
        Notificações
      </h2>

      <p className="text-xs abaixo-do-titulo">
        {contactIds.length > 0
          ? `${Object.values(notificationsByContact).flat().filter(n => !n.read).length} não lida(s)`
          : "nenhuma notificação carregada"
        }
      </p>

      <div className="accordion-list">
        {contactIds.map(contactId => {
          const contact = contacts.find(c => c.id === contactId)
          const list = notificationsByContact[contactId] || []
          const isOpen = openContacts.includes(contactId)

          return (
            <div key={contactId} className="accordion-card">
              <button
                onClick={() => toggle(contactId)}
                className={`accordion-header ${isOpen ? "open" : ""}`}
              >
                <div className="icon-circle">
                  <Icon.Notification />
                </div>

                <div className="flex-1">
                  <div>{contact?.name || `Contato ${contactId}`}</div>
                </div>

                <svg className="arrow" viewBox="0 0 20 20">
                  <path d="M6.293 8.293a1 1 0 011.414 0L10 10.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
                </svg>
              </button>

              <div
                ref={el => (panelRefs.current[contactId] = el)}
                style={{
                  maxHeight: heights[contactId] || "0px",
                  transition: "max-height 280ms ease",
                  overflow: "hidden"
                }}
                aria-hidden={!isOpen}
                className={`accordion-panel ${isOpen ? "open" : ""}`}
              >
                <div className="accordion-inner">
                  {list.length === 0 ? (
                    <p className="empty-panel">Sem notificações.</p>
                  ) : (
                    <ul className="notification-list">
                      {list.map(n => (
                        <li key={n.id} className={n.read ? "read" : ""}>
                          <strong>{n.title}</strong>
                          <p>{n.message}</p>
                          <small>{new Date(n.createdAt).toLocaleString()}</small>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}