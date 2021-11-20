class RangeSlider {
  constructor() {
    this.firstInput = document.getElementById('range-slider-handle-a')
    this.secondInput = document.getElementById('range-slider-handle-b')

    this.firstInput.addEventListener('input', (event) => {
      if (parseInt(event.target.value) > parseInt(this.secondInput.value)) {
        this.firstInput.value = this.secondInput.value
      }
    })

    this.secondInput.addEventListener('input', (event) => {
      if (parseInt(event.target.value) < parseInt(this.firstInput.value)) {
        this.secondInput.value = this.firstInput.value
      }
    })
  }
}

// in order to be used again provide ids of elements as arguments
const rangeSlider = new RangeSlider()
