// Beispiel: Annahme, dass du eine Funktion `updateCharts` hast, die Diagramme aktualisiert
function updateCharts(selectedDepots, selectedRisiken) {
    // Annahme: fakeDepotstellenData ist der Fakedatensatz für Depotstellen
    const filteredDepotstellen = fakeDepotstellenData.depotstellen.filter((depot) => {
        // Überprüfe, ob die Depotstelle in den ausgewählten Werten enthalten ist
        return selectedDepots.includes(depot.name);
    });

    // Annahme: fakeRisikoklassenData ist der Fakedatensatz für Risikoklassen
    const filteredRisikoklassen = fakeRisikoklassenData.risikoklassen.filter((risiko) => {
        // Überprüfe, ob die Risikoklasse in den ausgewählten Werten enthalten ist
        return selectedRisiken.includes(risiko.name);
    });
  const chartContainer = document.getElementById('chartContainers');

 chartContainer.innerHTML = '';
    // Hier kannst du die Highcharts-Diagramme mit den gefilterten Daten aktualisieren
    // Beispiel: Highcharts.chart('container', { ... });
    generateHighchartsChart('bar', 'Bestandverteilung der Depositstellen', filteredDepotstellen);
generateHighchartsChart('line', 'Verteilung der Risikoklassen', filteredRisikoklassen);


    // ...

    // Hier kannst du die weiteren Diagramme aktualisieren
    // Beispiel: Highcharts.chart('container2', { ... });
}

// Funktion zum Erstellen der Optionen für eine Multi-Select-Liste
function fillMultiSelect(options, selectElement) {
    options.forEach((option) => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        optionElement.selected = true;
        selectElement.appendChild(optionElement);
    });
}

// Daten für Depotstellen und Risikoklassen
const depotstellenOptions = fakeDepotstellenData.depotstellen.map((depot) => depot.name);
const risikoklassenOptions = fakeRisikoklassenData.risikoklassen.map((risiko) => risiko.name);

// Fülle Multi-Select-Listen
const depotSelect = document.getElementById('depotSelect');
depotSelect.multiple = true; // Erlaube Mehrfachauswahl
fillMultiSelect(depotstellenOptions, depotSelect);

const risikoSelect = document.getElementById('risikoSelect');
risikoSelect.multiple = true; // Erlaube Mehrfachauswahl
fillMultiSelect(risikoklassenOptions, risikoSelect);

// Funktion zum Aktualisieren der Diagramme basierend auf den ausgewählten Werten
function updateChartsBasedOnSelection() {
    const selectedDepots = Array.from(depotSelect.selectedOptions, (option) => option.value);
    const selectedRisiken = Array.from(risikoSelect.selectedOptions, (option) => option.value);

    // Überprüfe, ob sowohl Depotstellen als auch Risikoklassen ausgewählt wurden
    if (selectedDepots.length > 0 && selectedRisiken.length > 0) {
        updateCharts(selectedDepots, selectedRisiken);
    } else {
        // Hier kannst du eine Benachrichtigung ausgeben oder andere Maßnahmen ergreifen
        console.error('Bitte wählen Sie mindestens eine Depotstelle und eine Risikoklasse aus.');
    }

    alert('Filter angewendet!');
}

// Füge Event-Listener hinzu
depotSelect.addEventListener('change', updateChartsBasedOnSelection);
risikoSelect.addEventListener('change', updateChartsBasedOnSelection);

const submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', () => {
    updateChartsBasedOnSelection();
});