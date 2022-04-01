const textarea = document.getElementById("textarea-names")
const inputNumber = document.getElementById("input-quantity")
const resultArea = document.querySelector(".result-area")
const checkboxSort = document.getElementById('checkbox-alphabetic')
const checkboxSelectAll = document.getElementById('checkbox-select-all')
const checkboxDaily = document.getElementById('checkbox-daily')

// Funcao de sortear baseado na quantidade informada
function sort(){
    const names = textarea.value.split(",")
    let qtdSort = inputNumber.value
    if(names.some(e => e === " ") || names[0] === ""){
      alert("Os nomes a serem sorteados não devem estar em branco")
      return;
    }

    if(qtdSort > names.length) {
      alert("A quantidade sorteada tem que ser menor ou igual ao número de nomes")
      return;
    }

    let result = []
    
    for (let i = 0; i < qtdSort; i++) {
      const numAleatorio = parseInt(Math.random() * names.length)
      const nameResult = names[numAleatorio]
      result.push(nameResult.trim())
      names.splice(numAleatorio, 1)
    }
    
    if(checkboxSort.checked){
      result = result.sort()
    }
    
    generateResults(result)
}

// Sorteia 5 nomes para a daily
checkboxDaily.addEventListener('change', () => {
  checkboxSelectAll.disabled = !checkboxSelectAll.disabled
  checkboxSelectAll.checked = false
  checkboxSort.disabled = !checkboxSort.disabled
  checkboxSort.checked = false
  inputNumber.disabled = !inputNumber.disabled
  inputNumber.value = 5
})

let qtdNames = ""

// Eventos para quando o checkbox de sortear todos estiver ativo
textarea.addEventListener('input', () => {
  
  qtdNames = textarea.value.split(",").length

  if(checkboxSelectAll.checked){
    inputNumber.value = qtdNames
  }
})

checkboxSelectAll.addEventListener('change', ()=>{
    inputNumber.disabled = !inputNumber.disabled
    inputNumber.value = qtdNames
    checkboxDaily.disabled = !checkboxDaily.disabled
    checkboxDaily.checked = false
})

// Funcao para gerar o resultado do sorteio
function generateResults(resultArr){
  let spans = ""
  resultArr.forEach(name => spans += `<span class="sorted-name">${name}</span>`);
  
  resultArea.classList.remove("d-none")
  resultArea.innerHTML = `
    <h3>Os nomes sorteados foram: </h3>
    <div id="sorted-names-area" class="sorted-names-area">
      ${spans}
    </div>
    <button class="button-general button-rest" onclick="resort()">Sortear com os restantes</button>
  `
}

// Funcao para sortear os que ainda não foram sorteados
function resort() {
  const sortedSpans = Array.from(document.getElementById("sorted-names-area").children)
  const sortedNames = sortedSpans.map(e => e.textContent)
  const names = textarea.value.split(",")
  const namesNotSorted = names.filter(name => !sortedNames.includes(name.trim()))
  textarea.value = namesNotSorted.join(",")
}
