// Fakedatensatz
const fakeData = {
  columnNames: ["waehrung", "datum", "wechselkurs"],
  columnTypes: ["bpchar", "date", "numeric"],
  data: [
    ["EUR", "2023-09-20", "1.235"],
    ["USD", "2023-09-20", "1.0"],
    ["GBP", "2023-09-20", "1.395"],
    ["JPY", "2023-09-20", "0.009"],
    ["AUD", "2023-09-20", "0.75"]
  ]
};


function processData(data) {
  // Hier können Sie die Daten verarbeiten, berechnen und filtern
  // Zum Beispiel: Summe der Wechselkurse für jede Währung berechnen

  const currencySummaries = {};

  for (const entry of data.data) {
    const currency = entry[0];
    const exchangeRate = parseFloat(entry[2]);

    if (!currencySummaries[currency]) {
      currencySummaries[currency] = 0;
    }

    currencySummaries[currency] += exchangeRate;
  }

  return Object.entries(currencySummaries).map(([currency, sum]) => ({ currency, sum }));
}
// Annahme: Fakedaten für die JSON-Antworten der Ressourcen
const fakeBestandData = {
  berater: [
    {
      name: 'Berater A',
      anteilAmBestand: 200000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Berater B',
      anteilAmBestand: 150000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Berater C',
      anteilAmBestand: 150000, // Beispielwert für den Anteil am Bestand
    },
  ],
  gesamterBestand: 500000, // Beispielwert für den Gesamtbestand in Euro
};


const fakeDepotstellenData = {
  depotstellen: [
    {
      name: 'Depotstelle A',
      anteilAmBestand: 200000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Depotstelle B',
      anteilAmBestand: 150000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Depotstelle C',
      anteilAmBestand: 100000, // Beispielwert für den Anteil am Bestand
    },
  ],
};

const fakeProduktgeberData = {
  produktgeber: [
    {
      name: 'Produktgeber X',
      anteilAmBestand: 300000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Produktgeber Y',
      anteilAmBestand: 150000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Produktgeber Z',
      anteilAmBestand: 50000, // Beispielwert für den Anteil am Bestand
    },
  ],
};

const fakeRisikoklassenData = {
  risikoklassen: [
    {
      name: 'Niedriges Risiko',
      anteilAmBestand: 250000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Mittleres Risiko',
      anteilAmBestand: 150000, // Beispielwert für den Anteil am Bestand
    },
    {
      name: 'Hohes Risiko',
      anteilAmBestand: 100000, // Beispielwert für den Anteil am Bestand
    },
  ],
};

const fakeRisikoklassenProduktgeberData = {
  risikoklassenProduktgeber: [
    {
      risikoklasse: 'Niedriges Risiko',
      produktgeber: [
        {
          name: 'Produktgeber X',
          anteilAmBestand: 100000, // Beispielwert für den Anteil am Bestand
        },
        {
          name: 'Produktgeber Y',
          anteilAmBestand: 50000, // Beispielwert für den Anteil am Bestand
        },
      ],
    },
    {
      risikoklasse: 'Mittleres Risiko',
      produktgeber: [
        {
          name: 'Produktgeber X',
          anteilAmBestand: 50000, // Beispielwert für den Anteil am Bestand
        },
        {
          name: 'Produktgeber Z',
          anteilAmBestand: 100000, // Beispielwert für den Anteil am Bestand
        },
      ],
    },
    {
      risikoklasse: 'Hohes Risiko',
      produktgeber: [
        {
          name: 'Produktgeber Y',
          anteilAmBestand: 50000, // Beispielwert für den Anteil am Bestand
        },
        {
          name: 'Produktgeber Z',
          anteilAmBestand: 50000, // Beispielwert für den Anteil am Bestand
        },
      ],
    },
  ],
};

// Frage 1: Wieviel Bestand (in Euro) verwaltet der Berater?
const gesamterBestand = fakeBestandData.gesamterBestand;

// Frage 2: Wie verteilt sich der Bestand auf die verschiedenen Depotstellen?
const depotstellenVerteilung = fakeDepotstellenData.depotstellen;

// Frage 3: Wie verteilt sich der Bestand auf die verschiedenen Produktgeber?
const produktgeberVerteilung = fakeProduktgeberData.produktgeber;

// Frage 4: Wie verteilt sich der Bestand auf die verschiedenen Risikoklassen?
const risikoklassenVerteilung = fakeRisikoklassenData.risikoklassen;

// Frage 5: Wie verteilen sich die Risikoklassen auf die verschiedenen Produktgeber?
const risikoklassenProduktgeberVerteilung = fakeRisikoklassenProduktgeberData.risikoklassenProduktgeber.flatMap(entry =>
  entry.produktgeber.map(produktgeber => ({
    risikoklasse: entry.risikoklasse,
    name: produktgeber.name,
    anteilAmBestand: produktgeber.anteilAmBestand,
  }))
);
// Verwendung von Highcharts zur grafischen Visualisierung
// HTML-Element mit der ID 'container' wird für das Diagramm verwendet
// Funktion zur Generierung eines Highcharts-Diagramms
function generateHighchartsChart(chartType, titleText, seriesData, categoriesData, xAxisText) {
  const containerId = `chartContainer_${Date.now()}`;
  const containerDiv = document.createElement('div');
  containerDiv.id = containerId;
  const chartContainer = document.getElementById('chartContainers');
  chartContainer.appendChild(containerDiv);

  Highcharts.setOptions({
    colors: ['#87CEEB', '#FFB6C1', '#FFD700', '#98FB98', '#FFA07A']
  });

  Highcharts.chart(containerId, {
    chart: {
      type: chartType,
    },
    title: {
      text: titleText,
    },
    xAxis: {
      categories: categoriesData,
      title: {
        text: xAxisText,
      },
    },
    yAxis: {
      title: {
        text: 'Anteil am Bestand',
      },
    },
    series: [{
      name: "Bestand", // Beispiel für unterschiedliche Seriennamen
      data: seriesData.map(dataPoint => ({
        name: chartType === 'bar' ? dataPoint.risikoklasse : dataPoint.name,
        y: dataPoint.anteilAmBestand || dataPoint.anteilAmBestandWahrung, // Beispiel für unterschiedliche Datenfelder
      })),
    }],
  });
}

// Aufruf
// Frage 1: Wieviel Bestand (in Euro) verwaltet der Berater?
generateHighchartsChart('area', 'Verwaltung von Bestand in €', fakeBestandData.berater, fakeBestandData.berater.map(dataPoint => dataPoint.name), "Berater");

// Frage 2: Wie verteilt sich der Bestand auf die verschiedenen Depotstellen?
generateHighchartsChart('bar', 'Bestandverteilung der Depositstellen', depotstellenVerteilung, depotstellenVerteilung.map(dataPoint => dataPoint.name));

// Frage 3: Wie verteilt sich der Bestand auf die verschiedenen Produktgeber?
generateHighchartsChart('column', 'Bestandverteilung der Produktgeber', produktgeberVerteilung, produktgeberVerteilung.map(dataPoint => dataPoint.name));

// Frage 4: Wie verteilt sich der Bestand auf die verschiedenen Risikoklassen?
generateHighchartsChart('pie', 'Verteilung der Risikoklassen', risikoklassenVerteilung, risikoklassenVerteilung.map(dataPoint => dataPoint.name));

// Frage 5: Wie verteilen sich die Risikoklassen auf die verschiedenen Produktgeber?
generateHighchartsChart('bar', 'Verteilung der Risikoklassen auf die Produktgeber', risikoklassenProduktgeberVerteilung, risikoklassenProduktgeberVerteilung.map(dataPoint => dataPoint.risikoklasse));
