import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function MeetingCalendar() {

  const meetings = [
    {
      title: "Investor Pitch - Michael",
      date: "2026-03-10"
    },
    {
      title: "Startup Strategy Call",
      date: "2026-03-15"
    },
    {
      title: "Funding Discussion",
      date: "2026-03-20"
    }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📅 Meeting Scheduler</h2>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={meetings}
      />

    </div>
  );
}