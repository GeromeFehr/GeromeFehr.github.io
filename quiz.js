// Grafikkarten-Quiz für die Lernstation
// 12 Fragen, Zufallsreihenfolge

// globale Variable für die aktuell angezeigte Reihenfolge
let currentQuestions = [];

// ursprüngliche Fragenbasis
const questions = [
  {
    text: "Welche Aussage beschreibt die Hauptaufgabe einer dedizierten Grafikkarte am treffendsten?",
    options: [
      "Sie speichert dauerhaft alle Dateien des Systems.",
      "Sie berechnet Bild- und Grafikdaten und gibt diese an den Monitor aus.",
      "Sie stellt die Verbindung zwischen CPU und Festplatte her."
    ],
    correct: 1
  },
  {
    text: "Worin liegt der wichtigste Unterschied zwischen CPU und GPU?",
    options: [
      "Die CPU hat viele einfache Kerne, die GPU nur einen sehr schnellen Kern.",
      "Die CPU ist ausschließlich für Spiele zuständig, die GPU nur für Office.",
      "Die GPU besitzt sehr viele einfache Rechenkerne und ist auf parallele Berechnungen spezialisiert."
    ],
    correct: 2
  },
  {
    text: "Was beschreibt der Begriff VRAM (Video-RAM) am genauesten?",
    options: [
      "Den permanenten Massenspeicher für das Betriebssystem.",
      "Den Grafikspeicher, in dem Texturen, Bilddaten und Zwischenergebnisse liegen.",
      "Den Arbeitsspeicher der CPU."
    ],
    correct: 1
  },
  {
    text: "Warum ist eine große Anzahl an Shadern (Stream-Prozessoren) für eine GPU vorteilhaft?",
    options: [
      "Weil so mehr Monitore gleichzeitig angeschlossen werden können.",
      "Weil viele Pixel und Berechnungen gleichzeitig verarbeitet werden können.",
      "Weil dadurch das Betriebssystem schneller startet."
    ],
    correct: 1
  },
  {
    text: "Was ist die Aufgabe von Texture Mapping Units (TMUs)?",
    options: [
      "Sie steuern die Lüfterdrehzahl der Grafikkarte.",
      "Sie laden und verarbeiten Texturen, bevor sie auf Oberflächen gelegt werden.",
      "Sie erzeugen das Videosignal für den Monitor."
    ],
    correct: 1
  },
  {
    text: "Welche Funktion haben Render Output Units (ROPs)?",
    options: [
      "Sie finalisieren die berechneten Pixel und schreiben das fertige Bild in den Framebuffer.",
      "Sie verwalten die Stromversorgung der Grafikkarte.",
      "Sie sind ausschließlich für die Berechnung von Schatten verantwortlich."
    ],
    correct: 0
  },
  {
    text: "Welche Kennzahl steht in direktem Zusammenhang mit dem Strombedarf einer Grafikkarte?",
    options: [
      "TDP in Watt.",
      "Auflösung in Pixeln.",
      "Anzahl der DisplayPort-Anschlüsse."
    ],
    correct: 0
  },
  {
    text: "Was beschreibt die Speicherbandbreite einer Grafikkarte?",
    options: [
      "Die maximale Datenmenge pro Sekunde zwischen GPU und Grafikspeicher.",
      "Die Anzahl der installierten Lüfter.",
      "Die Kapazität der SSD im System."
    ],
    correct: 0
  },
  {
    text: "Wie wird die Praxisleistung von Gaming-Grafikkarten meist beurteilt?",
    options: [
      "Über die Anzahl der verbauten Kondensatoren.",
      "Über FPS-Werte und Benchmark-Ergebnisse in typischen Spielen.",
      "Über die verfügbare Anzahl an USB-Ports."
    ],
    correct: 1
  },
  {
    text: "Wodurch unterscheiden sich Workstation- bzw. CAD-Grafikkarten typischerweise von Consumer-/Gaming-Karten?",
    options: [
      "Sie sind günstiger, aber haben weniger Anschlüsse.",
      "Sie besitzen zertifizierte Treiber, sind auf Genauigkeit und Stabilität in Profi-Software optimiert und oft deutlich teurer.",
      "Sie funktionieren nur mit einem einzigen Monitor."
    ],
    correct: 1
  },
  {
    text: "(Expertenfrage) Welche Aussage zu Raytracing trifft am ehesten zu?",
    options: [
      "Raytracing ist ein Verfahren zur realistischen Berechnung von Licht und Schatten anhand von Lichtstrahlen.",
      "Raytracing beschreibt die Geschwindigkeit des Grafikkartenlüfters.",
      "Raytracing ist ein Synonym für Anti-Aliasing."
    ],
    correct: 0
  },
  {
    text: "Welche typische Kombination beschreibt eine dedizierte Consumer-Grafikkarte?",
    options: [
      "GPU, VRAM, Speichercontroller, Video-Ausgänge und Kühlsystem auf einer eigenen Steckkarte.",
      "Nur ein zusätzlicher Arbeitsspeicherriegel ohne eigene Kühlung.",
      "Ein integrierter Grafikchip im Prozessor ohne eigenen Speicher."
    ],
    correct: 0
  }
];

// Hilfsfunktion: Array zufällig mischen (Fisher-Yates)
function shuffle(array) {
  const arr = array.slice(); // Kopie
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

// Quiz in die Seite rendern
function renderQuiz() {
  const root = document.getElementById("quiz-root");
  if (!root) return;

  root.innerHTML = "";

  // Fragen zufällig mischen und global merken
  currentQuestions = shuffle(questions);

  currentQuestions.forEach(function (q, idx) {
    const container = document.createElement("div");
    container.className = "quiz-question";

    const p = document.createElement("p");
    p.textContent = (idx + 1) + ". " + q.text;
    container.appendChild(p);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz-options";

    q.options.forEach(function (opt, optIdx) {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + idx;   // Name hängt von der Position der Frage im aktuellen Durchlauf ab
      input.value = String(optIdx);

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + opt));
      optionsDiv.appendChild(label);
    });

    container.appendChild(optionsDiv);
    root.appendChild(container);
  });
}

// Quiz auswerten
function checkQuiz() {
  let correctCount = 0;
  let unanswered = 0;

  // Falls aus irgendeinem Grund noch nicht gerendert wurde
  if (!currentQuestions || currentQuestions.length === 0) {
    currentQuestions = questions.slice();
  }

  currentQuestions.forEach(function (q, idx) {
    const selected = document.querySelector('input[name="q' + idx + '"]:checked');
    if (!selected) {
      unanswered++;
      return;
    }
    const chosen = Number(selected.value);
    if (chosen === q.correct) {
      correctCount++;
    }
  });

  const result = document.getElementById("quiz-result");
  if (!result) return;

  if (unanswered > 0) {
    result.textContent =
      "Du hast " + correctCount + " von " + currentQuestions.length +
      " Fragen richtig beantwortet. (" + unanswered + " Frage(n) noch unbeantwortet.)";
    return;
  }

  const ratio = correctCount / currentQuestions.length;
  let feedback = "";

  if (ratio === 1) {
    feedback = "Perfekt – alle Antworten korrekt.";
  } else if (ratio >= 0.75) {
    feedback = "Sehr gut, du beherrschst die Grundlagen der Grafikkarten.";
  } else if (ratio >= 0.5) {
    feedback = "Solide, aber ein Blick in die Seiten Grundlagen und Kennzahlen lohnt sich noch.";
  } else {
    feedback = "Schau dir die Inhalte der Lernstation noch einmal in Ruhe an und versuche es erneut.";
  }

  result.textContent =
    "Du hast " + correctCount + " von " + currentQuestions.length +
    " Fragen richtig beantwortet. " + feedback;
}

// Initialisierung nach Laden der Seite
document.addEventListener("DOMContentLoaded", function () {
  renderQuiz();

  const btn = document.getElementById("check-btn");
  if (btn) {
    btn.addEventListener("click", checkQuiz);
  }
});
