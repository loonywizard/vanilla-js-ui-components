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

    this.inputs = [...this.formElement.getElementsByTagName('input')]
    this.errorContainers = [...this.formElement.getElementsByClassName('error-container')]

    this.formElement.addEventListener('submit', this.onFormSubmit)
    this.inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        const errorContainer = this.getErrorContainerByInputName(input.name)
        
        this.removeErrorFromErrorContainer(errorContainer)
      })

      input.addEventListener('blur', () => {
        const errorContainer = this.getErrorContainerByInputName(input.name)
        const validations = this.validationRules[input.name]
        const errorMessage = getErrorFromValidations(input.value, validations)

        if (errorMessage) {
          this.addErrorToErrorContainer(errorContainer, errorMessage)
        }
      })
    })
  }

  getErrorContainerByInputName = (inputName) => {
    return this.errorContainers.find((element) => element.dataset.inputName === inputName)
  }

  addErrorToErrorContainer = (errorContainer, errorMessage) => {
    errorContainer.innerHTML = errorMessage
    errorContainer.classList.remove('error-container-hidden')
  }
  
  removeErrorFromErrorContainer = (errorContainer) => {
    errorContainer.classList.add('error-container-hidden')
    errorContainer.innerHTML = ''
  }

  onFormSubmit = (event) => {
    event.preventDefault()

    let hasError = false
    
    this.inputs.forEach((inputElement) => {
      const validations = this.validationRules[inputElement.name]
      const errorMessage = getErrorFromValidations(inputElement.value, validations)

      const errorContainer = this.getErrorContainerByInputName(inputElement.name)

      if (errorMessage) {
        hasError = true

        this.addErrorToErrorContainer(errorContainer, errorMessage)
      } else {
        this.removeErrorFromErrorContainer(errorContainer)
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
