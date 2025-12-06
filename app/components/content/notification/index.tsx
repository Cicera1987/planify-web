'use client'

import React, { useEffect, useRef, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchAllNotifications, readContactNotifications, removeAllByContact, removeNotification } from "../../../store/features/notificationsSlice";
import Icon from "@/app/components/assets/icons"

import "./styles.css"
import formatMessage from "@/app/utils/formatMessage"
import { useContact } from "@/app/hooks/useContact"

export default function NotificationAccordion() {
  const dispatch = useDispatch < AppDispatch > ();
  const { contacts } = useContact();

  const notificationsByContact = useSelector((state: RootState) => state.notifications.notificationsByContact);

  const totalUnread = useMemo(() =>
    Object.values(notificationsByContact).flat().filter(n => !n.read).length,
    [notificationsByContact]
  );

  const contactIds = useMemo(
    () => Object.keys(notificationsByContact).map(Number),
    [notificationsByContact]
  );

  const [openContacts, setOpenContacts] = useState < number[] > ([]);
  const panelRefs = useRef < Record < number, HTMLDivElement | null >> ({});
  const [heights, setHeights] = useState < Record < number, string>> ({});

  useEffect(() => {
    dispatch(fetchAllNotifications());
    const interval = setInterval(() => dispatch(fetchAllNotifications()), 15000);
    return () => clearInterval(interval);
  }, []);

  function toggle(contactId: number) {
    dispatch(readContactNotifications(contactId));
    setOpenContacts(prev =>
      prev.includes(contactId) ? prev.filter(id => id !== contactId) : [...prev, contactId]
    );
  }

  useEffect(() => {
    const map: Record<number, string> = {};

    contactIds.forEach(id => {
      const el = panelRefs.current[id];
      map[id] = openContacts.includes(id) && el ? `${el.scrollHeight}px` : "0px";
    });

    setHeights(prev => JSON.stringify(prev) === JSON.stringify(map) ? prev : map);

  }, [openContacts, contactIds, notificationsByContact]);


  return (
    <div className="notification-wrapper">
      <h2 className="notification-title">Notificações</h2>

      <p className="text-xs text-gray-500 font-semibold">
        {contactIds.length === 0
          ? "Nenhuma notificação encontrada"
          : totalUnread > 0
            ? `${totalUnread} não lida(s)`
            : "Todas as notificações foram lidas"}
      </p>

      <div className="accordion-list">
        {contactIds.map(contactId => {
          const contact = contacts.find(c => c.id === contactId);
          const list = notificationsByContact[contactId] || [];
          const hasUnread = list.some(n => !n.read);
          const isOpen = openContacts.includes(contactId);

          return (
            <div key={contactId} className="accordion-card">

              <div className="flex">
                <div onClick={() => toggle(contactId)} className={`accordion-header ${isOpen ? "open" : ""}`}>
                  <div className="icon-circle">
                    <Icon.Notification hasUnread={hasUnread} />
                  </div>
                  <div className="flex-1">{contact?.name || `Contato ${contactId}`}</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    dispatch(removeAllByContact(contactId))
                  }}
                  className="cursor-pointer"
                >
                  <Icon.CloseTag />
                </button>
              </div>

              <div
                ref={(el) => {panelRefs.current[contactId] = el}}
                style={{ maxHeight: heights[contactId] || "0px", transition: "max-height .3s", overflow: "hidden" }}
                aria-hidden={!isOpen}
                className={`accordion-panel ${isOpen ? "open" : ""}`}
              >
                <div className="accordion-inner">
                  {list.length === 0 ? <p className="empty-panel">Sem notificações.</p> :
                    <ul className="notification-list">
                      {list.map(n => (
                        <li key={n.id} className={n.read ? "read" : ""}>
                          <div className="flex justify-between">
                            <strong>{n.title}</strong>
                            <button
                              className="cursor-pointer"
                              onClick={() => dispatch(removeNotification(n.id))}>
                             <Icon.CloseTag/>
                            </button>
                          </div>
                          <p>{formatMessage(n.message)}</p>
                          <small>{new Date(n.createdAt).toLocaleString()}</small>
                          
                        </li>
                      ))}
                    </ul>
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}