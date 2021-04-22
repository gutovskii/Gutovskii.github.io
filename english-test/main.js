let quizes = document.querySelectorAll('.quiz')

quizes.forEach(quiz => {
	let testButton = quiz.querySelector('.test-button')
	let showExerciseBtn = quiz.querySelector('.show-exercise')
	let showTranscriptBtn = quiz.querySelector('.show-transcript')

	testButton.onclick = () => { answerCheck(quiz) }

	if (showExerciseBtn && showTranscriptBtn){
		showExerciseBtn.onclick = () => { showExercise(quiz) }
		showTranscriptBtn.onclick = () => { showTranscript(quiz) }
	}
})

function answerCheck(quiz) {
	let rightAnswers = 0
	let testAnswers = quiz.querySelectorAll('.test-answers')
	let radioBoxes = []
	let testLabels = []

	radioBoxes = [...testAnswers].map( test => test.querySelectorAll('input[type="radio"]') )
	testLabels = [...testAnswers].map( test => test.querySelectorAll('label') )

	radioBoxes.forEach( (radios, i) => {
		radios.forEach( (radio, j) => {
			testLabels[i][j].classList.remove('right-answer')
			testLabels[i][j].classList.remove('wrong-answer')

			if ( radio.checked ){
				if ( radio.dataset.right === 'right' ){
					testLabels[i][j].classList.add('right-answer')
					rightAnswers++
				}else{
					testLabels[i][j].classList.add('wrong-answer')
				}
			}
		})
	})

	let resultBox = quiz.querySelector('.test-result')
	resultBox.innerText = `${rightAnswers}/${testLabels.length}`
}

function showExercise(quiz) {
	let tests = quiz.querySelector('.tests')
	let transcript = quiz.querySelector('.test-text')

	transcript.classList.add('non-active')
	tests.classList.remove('non-active')
}

function showTranscript(quiz) {
	let tests = quiz.querySelector('.tests')
	let transcript = quiz.querySelector('.test-text')

	transcript.classList.remove('non-active')
	tests.classList.add('non-active')
}