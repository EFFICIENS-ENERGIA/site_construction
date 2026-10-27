// Générateur de fichier d'événement ICS pour confirmation de RDV Copilote IA
function generateICS(title, description, location, startDate, endDate) {
    const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');
    
    const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//EFFICIENS ENERGIA//Rendez-vous Expertise//FR',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${location}`,
        `DTSTART:${formatDate(new Date(startDate))}`,
        `DTEND:${formatDate(new Date(endDate))}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'RDV_EFFICIENS_ENERGIA.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
