
let MonthsAllLanguages = [
  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
  ["תשרי", "חשוון", "כסלו", "טבת", "שבט", "אדר", "ניסן", "אייר", "סיוון", "תמוז", "אב", "אלול"]
]

let currentLanguageIdx = load_language_index(MonthsAllLanguages.length);

let Months = MonthsAllLanguages[currentLanguageIdx]
let selectedMonthIdx = 0
let permutation = Array(12);
let a;
numRows = 4;
numCols = 3;

let textNodes = Array();
const body = document.body;
const monthInfoLabel = document.getElementById("monthInfoLabel");
const TableArea = document.getElementById("TableArea");

function makeTable() {

  tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.style.height = '92%';
  tbl.style.border = '1px solid black';

  for (let rowIdx = 0; rowIdx < numRows; rowIdx++) {
    const tr = tbl.insertRow();
    for (let colIdx = 0; colIdx < numCols; colIdx++) {
      const td = tr.insertCell();
      let cellIdx = rowIdx * numCols + colIdx
      textNodes[cellIdx] = document.createElement("button");
      textNodes[cellIdx].innerText = Months[cellIdx];
      textNodes[cellIdx].style.fontSize = "24px";
      textNodes[cellIdx].style.width = "100%";
      textNodes[cellIdx].style.height = "100%";
      textNodes[cellIdx].onclick = function () { OnClick(cellIdx) };
      td.appendChild(textNodes[cellIdx]);
      td.style.border = '1px solid black';
    }
  }
  TableArea.appendChild(tbl);

  shuffle();
  reDraw();
}

async function OnClick(cellIdx) {
  /* check if correct */
  if (permutation[cellIdx] == selectedMonthIdx) {
    textNodes[cellIdx].style.backgroundColor = "lightGreen";

    await sleep(200);

    /* shuffle */
    shuffle();
    reDraw();
  } else {
    textNodes[cellIdx].style.backgroundColor = "#FFCCCB";
  }
}

function reDraw() {
  monthInfoLabel.innerText = "choose month number " + (selectedMonthIdx + 1)
  for (let cellIdx = 0; cellIdx < textNodes.length; cellIdx++) {
    /* set text on button */
    textNodes[cellIdx].innerText = Months[permutation[cellIdx]];
    /* clear color */
    textNodes[cellIdx].style.backgroundColor = "white";
  }

  // update DisplayProb
  let weights = load_weights();
  weight = weights[selectedMonthIdx] / sum(weights)
  DisplayProb = document.getElementById("DisplayProb");
  DisplayProb.innerText = "P = " + (weight * 12).toFixed(2) + "/12"
}

function shuffle() {
  permutation = makePermutation();

  let weights = load_weights();
  while (true) {
    let newSelectedMonthIdx = random_choice(weights);
    if (newSelectedMonthIdx != selectedMonthIdx) {
      selectedMonthIdx = newSelectedMonthIdx;
      break;
    }
  }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function makePermutation() {
  array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function VoteUp() { alert("up"); }
function VoteDown() { alert("down"); }

function ChangeLang() {
  currentLanguageIdx = (currentLanguageIdx + 1) % MonthsAllLanguages.length;
  Months = MonthsAllLanguages[currentLanguageIdx];
  save_language_index(currentLanguageIdx);
  reDraw();
}

makeTable();

function VoteUp() {
  let weights = load_weights();
  weights = normalize_weights(weights);
  weights[selectedMonthIdx] += 1 / 12;
  save_weights(weights);
  reDraw();
}

function VoteDown() {
  let weights = load_weights();
  weights[selectedMonthIdx] *= 0.8;
  save_weights(weights);
  reDraw();
}

function ResetMemory() {
  reset_memory();
  reDraw();
}