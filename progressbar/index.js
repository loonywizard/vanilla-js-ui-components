/*

States of ProgressBar:

[Active]
we have progress bar + STOP button

[Stopped]
we have progress bar + START button + RESET button

[Completed]
we have progress bar + RESET button

----------------------------------------------------------------

RESET button resets progress bar to 0% but it doesn't start it
STOP button stops progress bar
START button starts progress bar

*/

// TODO: add pecentage display block

// TODO get width of progress bar by accessing css properties
const PROGRESS_BAR_WIDTH = 400
const PROGRESS_BAR_BORDER_WIDTH = 1

class ProgressBar {
  constructor() {
    this.updateTimeoutId = null
    this.progressBarValue = 0

    // wrapper of progress bar + buttons for it
    this.progressBarWrapper = document.createElement('div')

    this.progressBarContainer = document.createElement('div')
    this.progressBarFilledBar = document.createElement('div')
    this.progressBarInfoBlock = document.createElement('div')

    this.progressBarContainer.classList.add('progressbar-container')
    this.progressBarFilledBar.classList.add('progressbar-filledbar')
    this.progressBarInfoBlock.classList.add('progressbar-info-block')

    this.progressBarContainer.append(this.progressBarFilledBar)
    this.progressBarWrapper.append(this.progressBarContainer, this.progressBarInfoBlock)

    // this will set progress bar value to 0%
    this.reset()
    this.start()

    return this.progressBarWrapper
  }

  createResetButton = () => {
    const resetButton = document.createElement('button')

    resetButton.innerHTML = 'RESET'
    resetButton.addEventListener('click', this.reset)

    return resetButton
  }

  initActiveInfoBlock = () => {
    const stopButton = document.createElement('button')

    stopButton.innerHTML = 'STOP'
    stopButton.addEventListener('click', this.stop)

    this.progressBarInfoBlock.replaceChildren(stopButton)
  }

  initStoppedInfoBlock = () => {
    const resumeButton = document.createElement('button')

    resumeButton.innerHTML = 'RESUME'
    resumeButton.addEventListener('click', this.start)

    this.progressBarInfoBlock.replaceChildren(resumeButton)

    if (this.progressBarValue > 0) this.progressBarInfoBlock.append(this.createResetButton())
  }

  initCompletedInfoBlock = () => {
    this.progressBarInfoBlock.replaceChildren(this.createResetButton())
  }

  update = () => {
    this.progressBarValue += 0.3

    this.updateProgressBarFilledBarBlock()

    this.updateTimeoutId = setTimeout(() => {
      if (this.progressBarValue < 100) this.update()
      else this.complete()
    }, 10)
  }

  reset = () => {
    this.progressBarValue = 0
    this.updateProgressBarFilledBarBlock()
    this.initStoppedInfoBlock()
  }

  stop = () => {
    if (this.updateTimeoutId !== null) clearTimeout(this.updateTimeoutId)

    this.initStoppedInfoBlock()
  }

  complete = () => {
    this.initCompletedInfoBlock()
  }

  start = () => {
    this.initActiveInfoBlock()
    this.update()
  }

  updateProgressBarFilledBarBlock = () => {
    const widthInPixels = Math.floor(
      this.progressBarValue *
      ((PROGRESS_BAR_WIDTH - 2 * PROGRESS_BAR_BORDER_WIDTH) / 100)
    )

    this.progressBarFilledBar.style.width = `${widthInPixels}px`
  }
}

const progressBarSection = document.getElementById('progressbar-section')
const progressBar = new ProgressBar()

progressBarSection.append(progressBar)
