const textInput = document.querySelector('input[type=text]')
const textExample = document.querySelector('#textExample')
const letters=Array.from(document.querySelectorAll('[data-letter]'))
const errorPercent = document.querySelector('#errorPercent')
const symbolPerMinutes = document.querySelector('.indicator__symbol')
const wordPerMinutes = document.querySelector('.indicator__word')
let errorCounter = 0
let count = 0



textInput.addEventListener('keyup', function(e) {

    const letter = letters.find(elem => elem.dataset.letter.toLowerCase() === e.key.toLowerCase())
    
    if(letter){
        letter.classList.remove('pressed')
    }

    let textToBePrinted
    let printedText
    let hint

    let controlText = textExample.firstElementChild
    
    if(textExample.innerText.startsWith(this.value)) {
        
        printedText = textExample.innerText.slice(0, this.value.length)
        hint = textExample.innerText.slice(this.value.length, this.value.length+1)

        if(this.value.length === 0) {
            textToBePrinted = textExample.innerText.slice(this.value.length)
        }

        textToBePrinted = textExample.innerText.slice(this.value.length+1)
    }

    if(printedText){

        controlText.innerHTML = `<span class="done">${printedText}</span><span class="hint">${hint}</span>${textToBePrinted}`

    }

    if(!textExample.innerText.startsWith(this.value) && e.key !== 'Backspace'){

        textInput.classList.add('backGroundError')

        setTimeout(() => {
            textInput.classList.remove('backGroundError')
        }, 100);

        if(errorCounter >= 1) {

            const textValueArray = textInput.value.split('')

            textValueArray.pop()

            textInput.value = textValueArray.join('')
        }

        errorCounter++
    }

    if(errorCounter >= 1 && e.key !== 'Backspace') {
        errorPercent.innerHTML = `${parseInt((errorCounter / textInput.value.length)*100)}%`

        if(textInput.value.length === 1){
            errorPercent.innerHTML = '100%'
            errorCounter = 1
        }

    }

})

textInput.addEventListener('keydown', function(e) { 
    const noPoint = textInput.value.replace(',', '')
    
    const letter = letters.find(elem => elem.dataset.letter.toLowerCase()===e.key.toLowerCase())
    
    if(letter){
        letter.classList.add('pressed')
    }

    if(count === 0 && e.key !== 'Shift') {
        setInterval(() => {
            count++
        }, 1000);
    }

    if(count <= 60) {
        symbolPerMinutes.innerText = textInput.value.length +1
        wordPerMinutes.innerText = noPoint.split(' ').length
    }

})


function binarySearch(arr, items) {
    let min = 0
    let max = arr.length
    let middle
    let counter = 0

    for(let i = 0; i < arr.length; i++) {

        middle = parseInt((min + max)/2)

        if(middle === items) {
            items = middle
            break
        }

        if(items > middle) {
            min = middle + 1
        } else {
            max = middle - 1
        }

        counter++
    }
    
    console.log(counter)
    return items
}

function selectedSort(arr) {

    let result = []
    let length = arr.length

    for(let i = 0; i < length; i++){

        result.push(minimumNumber(arr))

        arr.splice(arr.indexOf(minimumNumber(arr)),1)
    }
    
    return result
}

function minimumNumber(arr) {
    let min = arr[0]

    for(let i = 1; i < arr.length; i++) {

        if(arr[i] < min) {
            min = arr[i]
        }
    }

    return min
}

function bubuleSort(arr) {
    for(let i = 0; i < arr.length; i++) {

        for(let j = 0; j < arr.length; j++) {

            if(arr[i + j] < arr[i]) {
                [arr[i], arr[i + j]] = [arr[i + j], arr[i]]
            }

        }

    }

    return arr
}

function quickSort(arr) {

    let pivetIndex = parseInt(arr.length / 2)
    let pivet = arr[pivetIndex]
    let leftSide = []
    let rightSide = []

    if(arr.length <=1) {
        return arr
    }

    for(let i = 0; i < arr.length; i++) {

        if(pivetIndex === i) {
            continue
        }

        if(arr[i] < pivet) {
            leftSide.push(arr[i])
        } else {
            rightSide.push(arr[i])
        }
        
    }

    return [].concat([...quickSort(leftSide)],pivet,[...quickSort(rightSide)])
}