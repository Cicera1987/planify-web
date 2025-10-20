"use client";
import CalendarContent from "@/app/components/content/calendar/page";

export default function CalendarMobile() {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-white p-4">
            <CalendarContent />
        </div>
    );
}
