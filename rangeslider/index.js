class RangeSlider {
  constructor() {
    this.firstInput = document.getElementById('range-slider-handle-a')
    this.secondInput = document.getElementById('range-slider-handle-b')
    // TODO: refactor getting this element
    this.inputTrack = document.getElementsByClassName('range-slicer-track')[0]

    this.firstInput.addEventListener('input', (event) => {
      if (parseInt(event.target.value) > parseInt(this.secondInput.value)) {
        this.firstInput.value = this.secondInput.value
      }

      this.updateSliderTrack()
    })

    this.secondInput.addEventListener('input', (event) => {
      if (parseInt(event.target.value) < parseInt(this.firstInput.value)) {
        this.secondInput.value = this.firstInput.value
      }

      this.updateSliderTrack()
    })

    this.updateSliderTrack()
  }

  updateSliderTrack = () => {
    const computedStyles = window.getComputedStyle(this.firstInput)

    const inputWidth = parseInt(computedStyles.width)
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
}

// in order to be used again provide ids of elements as arguments
const rangeSlider = new RangeSlider()
