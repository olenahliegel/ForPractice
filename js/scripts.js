//Business logic
function countUpBy(countTo, countBy) {
  let result = [];
  if (isNaN(countTo) || isNaN(countBy) ||
    (countTo <= 0) || (countBy <= 0) ||
    (countTo < countBy)) {
    return null;
  }
  for (let i = countBy; i <= countTo; i += countBy) {
    result.push(i);
  }
  return result;
}

function replaceVowels(text) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  const textArray = text.trim().split(" ");
  for (let i = 0; i < textArray.length; i++) {
    let charsInWord = Array.from(textArray[i]);
    for (let j = 0; j < charsInWord.length; j++) {
      if (vowels.includes(charsInWord[j].toLowerCase())) {
        charsInWord[j] = "-";
      }
    }
    textArray[i] = charsInWord.join("");
  }
  return textArray.join(" ");
}

//UI logic
function displayResult(resultArray, ulElement) {
  resultArray.forEach(function (element) {
    const li = document.createElement("li");
    li.innerText = element;
    ulElement.appendChild(li);
  });
}

function handleUserChoice(e) {
  e.preventDefault();
  const countTo = parseInt(document.querySelector("input[name=countTo]").value);
  const countBy = parseInt(document.querySelector("input[name=countBy]").value);

  const div1 = document.querySelector("div#result1");
  div1.innerHTML = "";
  const h2 = document.createElement("h2");
  div1.appendChild(h2);

  if (countTo < 0 || countBy <= 0) {
    h2.innerText = "Both numbers must be greater than 0.";
  }

  if (countTo < countBy) {
    h2.innerText = "The 'Count To' number must be larger than the 'Count By' number.";
  }

  if (!countTo || !countBy) {
    h2.innerText = "Number values are required for both 'Count By' and 'Count To' fields.";
  }

  const result = countUpBy(countTo, countBy);
  if (result) {
    const ul = document.createElement("ul");
    h2.innerText = "Result for count by: " + countBy + " and count to: " + countTo + " is";
    div1.append(h2, ul);
    displayResult(result, ul);
  }
}

function handleUserText(e) {
  e.preventDefault();
  const initialText = document.querySelector("input[name=initialSentence]").value;
  document.querySelector("form#input2-form").setAttribute("class", "hidden");
  const divResult = document.querySelector("div#resultText");
  document.querySelector("div#result2").removeAttribute("class");
  const h2 = document.createElement("h2");
  divResult.prepend(h2);
  h2.innerText = "The text is: ";
  const p = document.createElement("p");
  h2.after(p);
  p.innerText = replaceVowels(initialText);
}

function reset() {
  document.querySelector("form#input2-form").removeAttribute("class");
  document.querySelector("div#result2").setAttribute("class", "hidden");
  document.querySelector("div#resultText").innerHTML = "";
  document.querySelector("input[name=initialSentence]").value = "";
}

window.addEventListener("load", function () {
  document.getElementById("input-form").addEventListener("submit", handleUserChoice);
  document.getElementById("input2-form").addEventListener("submit", handleUserText);
  document.querySelector("#result2 button").addEventListener("click", reset);

});