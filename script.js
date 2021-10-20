let word = document.getElementById("word");
let searchWord = document.getElementById("search-word");
let meaning = document.getElementById("meaning");
let meaning_example = document.getElementById("meaning-example");
let partOfSpeech = document.getElementById("part-of-speech");
let btnSearch = document.getElementById("search");
let wordAudio = new Audio();
let btnAudio = document.getElementById("audio");

const getMeaning = async () => {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.value}`;
  const response = await fetch(url);
  const data = await response.json();
//   console.log(data);
  if (!response.ok) {
    meaning.innerHTML = `😌 ${data.message}`;
  } else {
    searchWord.innerHTML = data[0].word;
    meaning.innerHTML = data[0].meanings[0].definitions[0].definition;
    meaning_example.innerHTML = data[0].meanings[0].definitions[0].example;
    // css for meaning_example
    meaning_example.style.marginTop = '20px';
    partOfSpeech.innerHTML = `${data[0].meanings[0].partOfSpeech} / ${data[0].phonetics[0].text}`;
    // css for partOfSpeech
    partOfSpeech.style.padding = '20px 0';
    wordAudio.src = data[0].phonetics[0].audio;
    btnAudio.style.opacity = 1;
  }
};
btnSearch.addEventListener("click", () => {
//   console.log(word.value);
  if (!word.value) {
    alert("Please enter the word");
  } else {
    getMeaning();
  }
});

btnAudio.addEventListener("click", () => {
  wordAudio.play();
});
