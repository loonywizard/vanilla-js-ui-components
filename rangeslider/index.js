class RangeSlider {
  constructor(rangeSliderId) {
    const rangeSliderContainer = document.getElementById(rangeSliderId)

    const [firstInput, secondInput] = rangeSliderContainer.getElementsByTagName('input')

    this.firstInput = firstInput
    this.secondInput = secondInput
    
    this.inputTrack = rangeSliderContainer.getElementsByClassName('range-slider-track')[0]
    this.infoPanel = rangeSliderContainer.getElementsByClassName('range-slider-info')[0]

    this.firstInput.addEventListener('input', (event) => {
      if (parseInt(event.target.value) > parseInt(this.secondInput.value)) {
        this.firstInput.value = this.secondInput.value
      }

      this.updateInfoAndTrack()
    })

    this.secondInput.addEventListener('input', (event) => {
      if (parseInt(event.target.value) < parseInt(this.firstInput.value)) {
        this.secondInput.value = this.firstInput.value
      }

      this.updateInfoAndTrack()
    })

    this.updateInfoAndTrack()
  }

  // since these operations are often called toghether it is easier to combine them into one method
  updateInfoAndTrack = () => {
    this.updateSliderTrack()
    this.updateInfoPanel()
  }

  updateSliderTrack = () => {
    const computedStyles = window.getComputedStyle(this.firstInput)

    // we can't access ::after elements styles via DOM
    const INPUT_HANDLE_WIDTH = 20
    
    // subtract two halfs of handle width - 2 * 1/2 = 1
    const inputWidth = parseInt(computedStyles.width) - INPUT_HANDLE_WIDTH
    const minInputValue = parseInt(this.firstInput.min)
    const maxInputValue = parseInt(this.firstInput.max)
    const firstInputValue = parseInt(this.firstInput.value)
    const secondInputValue = parseInt(this.secondInput.value)

    const valuesLength = maxInputValue - minInputValue
    const widthToValuesLengthRation = inputWidth / valuesLength

    // TODO use handles size here (if possible)
    this.inputTrack.style.left = `${firstInputValue * widthToValuesLengthRation}px`
    this.inputTrack.style.right = `${inputWidth - secondInputValue * widthToValuesLengthRation}px`
  }

  updateInfoPanel = () => {
    const firstInputValue = parseInt(this.firstInput.value)
    const secondInputValue = parseInt(this.secondInput.value)

    this.infoPanel.innerHTML = `a = ${firstInputValue}, b = ${secondInputValue}`
  }
}

const rangeSlider = new RangeSlider('range-slider')
