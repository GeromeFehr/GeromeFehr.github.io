// Fragenkatalog für das Grafikkarten-Quiz
const questions = [
  {
    text: "Welche Hauptaufgabe hat die Grafikkarte im Computer?",
    options: [
      "Sie speichert dauerhaft Daten wie eine Festplatte.",
      "Sie berechnet Bilder und Grafiken und schickt sie an den Monitor.",
      "Sie stellt die Internetverbindung her."
    ],
    correct: 1
  },
  {
    text: "Worin unterscheidet sich eine GPU grundsätzlich von einer CPU?",
    options: [
      "Die GPU hat sehr viele einfache Rechenkerne und ist auf parallele Berechnungen spezialisiert.",
      "Die GPU ist langsamer, aber speichert mehr Daten dauerhaft.",
      "Es gibt keinen Unterschied, beide machen exakt das Gleiche."
    ],
    correct: 0
  },
  {
    text: "Was beschreibt der Begriff VRAM?",
    options: [
      "Den Arbeitsspeicher der CPU.",
      "Den Grafikspeicher, in dem Texturen und Bilddaten liegen.",
      "Den Speicher der Festplatte."
    ],
    correct: 1
  },
  {
    text: "Welche Kennzahl ist direkt mit dem Strombedarf einer Grafikkarte verknüpft?",
    options: [
      "TDP in Watt",
      "Auflösung in Pixeln",
      "Anzahl der HDMI-Anschlüsse"
    ],
    correct: 0
  },
  {
    text: "Was sind Shader (bzw. Stream-Prozessoren)?",
    options: [
      "Spezielle Lüfter für die Kühlung der GPU.",
      "Rechenkerne innerhalb der GPU, die Pixel, Licht und Effekte berechnen.",
      "Programme, die Treiber automatisch aktualisieren."
    ],
    correct: 1
  },
  {
    text: "Warum werden in einer modernen GPU so viele Shader benötigt?",
    options: [
      "Damit die Grafikkarte mehrere Betriebssysteme gleichzeitig starten kann.",
      "Weil jedes Spiel mindestens einen Shader braucht.",
      "Weil Millionen Pixel gleichzeitig berechnet werden müssen und viele Rechenkerne dafür ideal sind."
    ],
    correct: 2
  },
  {
    text: "Was macht eine TMU (Texture Mapping Unit)?",
    options: [
      "Sie lädt und filtert Texturen für die Darstellung auf Oberflächen.",
      "Sie steuert die Lüfterdrehzahl.",
      "Sie ist nur für die Bildausgabe an den Monitor zuständig."
    ],
    correct: 0
  },
  {
    text: "Welche Aussage zu Workstation-/CAD-Grafikkarten trifft zu?",
    options: [
      "Sie sind nur teurer, weil sie bunter leuchten.",
      "Sie besitzen zertifizierte Treiber und sind auf Genauigkeit und Stabilität ausgelegt.",
      "Sie sind ausschließlich zum Spielen in 8K gedacht."
    ],
    correct: 1
  }
];

// Quiz dynamisch in die Seite einbauen
function renderQuiz() {
  const root = document.getElementById("quiz-root");
  root.innerHTML = "";

  questions.forEach((q, idx) => {
    const container = document.createElement("div");
    container.className = "quiz-question";

    const p = document.createElement("p");
    p.innerHTML = (idx + 1) + ". " + q.text;
    container.appendChild(p);

    const optionsDiv = document.createElement("div");
    optionsDiv.className = "quiz-options";

    q.options.forEach((opt, optIdx) => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "q" + idx;
      input.value = optIdx;

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + opt));
      optionsDiv.appendChild(label);
    });

    container.appendChild(optionsDiv);
    root.appendChild(container);
  });
}

// Auswertung der Antworten
function checkQuiz() {
  let correctCount = 0;
  let unanswered = 0;

  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    if (!selected) {
      unanswered++;
      return;
    }
    if (Number(selected.value) === q.correct) {
      correctCount++;
    }
