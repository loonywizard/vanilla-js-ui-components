function getErrorFromValidations(value, validationsRules) {
  for (const validation of validationsRules) {
    const validationMessage = validation(value)

    if (validationMessage) return validationMessage
  }

  return null
}


class MyFormValidator {
  constructor(formId, validationRules) {
    this.formElement = document.getElementById(formId)
    this.validationRules = validationRules

    this.formElement.addEventListener('submit', this.onFormSubmit)
  }

  onFormSubmit = (event) => {
    event.preventDefault()

    let hasError = false

    const inputs = [...this.formElement.getElementsByTagName('input')]
    const errorContainers = [...this.formElement.getElementsByClassName('error-container')]
    
    inputs.forEach((inputElement) => {
      const validations = this.validationRules[inputElement.name]
      const errorMessage = getErrorFromValidations(inputElement.value, validations)

      const errorContainer = errorContainers.find((element) => element.dataset.inputName === inputElement.name)

      if (errorMessage) {
        hasError = true

        errorContainer.innerHTML = errorMessage
        errorContainer.classList.remove('error-container-hidden')
      } else {
        errorContainer.classList.add('error-container-hidden')
        errorContainer.innerHTML = ''
      }
    })

    if (!hasError) {
      console.log('Successfully submitted!')
    }
  }
}


const ONLY_NON_WHITESPACE_REGEX = /^\S*$/

// IF validation fn returns MESSAGE than validation is not passed
function isRequired(value) {
  if (value.replace(/^\s+/g, '') === '') return 'Field is required'
}

function noWhiteSpaces(value) {
  if (!ONLY_NON_WHITESPACE_REGEX.test(value)) return 'No whitespaces allowed'
}

const FORM_ID = 'form-validation-example'
const VALIDATION_RULES = {
  name: [isRequired],
  username: [isRequired, noWhiteSpaces],
  age: [isRequired],
}

const formValidator = new MyFormValidator(FORM_ID, VALIDATION_RULES)
