// ==========================================================================
// GÉNÉRATEUR D'INVITATION CALENDRIER (.ICS / GOOGLE CALENDAR) — EFFICIENS ENERGIA
// ==========================================================================
(function() {
    'use strict';

    window.exportAppointmentToCalendar = function(rdv) {
        const title = rdv.title || "Rendez-vous Expertise Technique — EFFICIENS ENERGIA";
        const description = rdv.description || "Rendez-vous préparatoire d'expertise technique avec Sébastien Mathe (EFFICIENS ENERGIA). Tél : 07 78 24 65 67.";
        const location = rdv.location || "480 Route du Belvédère, 01250 Hautecourt-Romanèche / Visio";
        const startDate = new Date(rdv.startISO || Date.now() + 86400000);
        const endDate = new Date(startDate.getTime() + (rdv.durationMinutes || 45) * 60000);

        const formatICS = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');

        // Génération ICS
        const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//EFFICIENS ENERGIA//Agenda RDV Hub//FR',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `UID:rdv-${Date.now()}@efficiens-energia.fr`,
            `DTSTAMP:${formatICS(new Date())}`,
            `DTSTART:${formatICS(startDate)}`,
            `DTEND:${formatICS(endDate)}`,
            `SUMMARY:${title}`,
            `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
            `LOCATION:${location}`,
            'STATUS:CONFIRMED',
            'END:VEVENT',
            'END:VCALENDAR'
        ];

        const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'RDV_EFFICIENS_ENERGIA.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    window.getGoogleCalendarLink = function(rdv) {
        const title = encodeURIComponent(rdv.title || "Rendez-vous Expertise Technique — EFFICIENS ENERGIA");
        const description = encodeURIComponent(rdv.description || "Échange technique avec Sébastien Mathe (07 78 24 65 67).");
        const location = encodeURIComponent(rdv.location || "Visio / Téléphone");
        const startDate = new Date(rdv.startISO || Date.now() + 86400000);
        const endDate = new Date(startDate.getTime() + (rdv.durationMinutes || 45) * 60000);
        const formatGCal = (d) => d.toISOString().replace(/-|:|\.\d+/g, '');

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGCal(startDate)}/${formatGCal(endDate)}&details=${description}&location=${location}`;
    };
})();
