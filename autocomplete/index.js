const AUTOCOMPLETE_DICTONARY = [
  'Amsterdam',
  'Berlin',
  'Moscow',
  'London',
  'Rome',
  'Paris',
  'New York',
  'Los Angeles',
  'Vancouver',
  'Antwerpen',
  'Arkhangelsk',
  'Perm',
  'Babaevo',
  'Vologda',
  'Toronto',
  'Washington',
  'Madrid',
  'Tokio',
]

class Autocomplete {
  constructor(dictonary) {
    // all possible suggestions for autocomplete
    this.dictonary = dictonary

    // HTML input value
    this.inputValue = ''

    // suggestions for this.inputValue
    this.suggestions = []

    this.autocompleteContainer = document.createElement('div')
    this.autocompleteInput = document.createElement('input')
    this.autocompleteSuggestionsDropdown = document.createElement('div')

    this.autocompleteInput.placeholder = 'Select your destination'

    this.autocompleteContainer.classList.add('autocomplete-container')
    this.autocompleteInput.classList.add('autocomplete-input')
    this.autocompleteSuggestionsDropdown.classList.add('autocomplete-dropdown')

    this.autocompleteInput.addEventListener('input', this.onInputValueChange)
    this.autocompleteInput.addEventListener('focus', this.onInputFocus)
    
    document.addEventListener('click', this.onClickOutside)

    this.autocompleteContainer.appendChild(this.autocompleteInput)
    this.autocompleteContainer.appendChild(this.autocompleteSuggestionsDropdown)

    this.autocompleteDropdownClickListener = null

    return this.autocompleteContainer
  }

  setCurrentSuggestions = () => {
    this.suggestions = this.dictonary.filter((dictEntry) => (
      dictEntry.toLowerCase().startsWith(this.inputValue.toLocaleLowerCase())
    ))
  }

  onInputFocus = () => {
    this.setCurrentSuggestions()
    this.setSuggestions()
    if (this.suggestions.length) this.openSuggestionsDropdown()
  }

  onClickOutside = (event) => {
    if (
      event.target.matches('.autocomplete-input') ||
      event.target.matches('.autocomplete-dropdown')
    ) return
    
    this.closeSuggestionsDropdown()
  }

  onInputValueChange = (event) => {
    this.inputValue = event.target.value
    this.setCurrentSuggestions()
    
    if (this.suggestions.length > 0) {
      this.setSuggestions()
      this.openSuggestionsDropdown()
    } else {
      this.closeSuggestionsDropdown()
    }
  }

  setSuggestions = () => {
    this.autocompleteSuggestionsDropdown.innerHTML = ''

    this.suggestions.forEach((suggestion) => {
      const htmlSuggestion = document.createElement('div')

      const boldText = suggestion.slice(0, this.inputValue.length)
      const regularText = suggestion.slice(this.inputValue.length)
      
      htmlSuggestion.innerHTML = `<b>${boldText}</b>${regularText}`
      htmlSuggestion.dataset.suggestionValue = suggestion
      htmlSuggestion.classList.add('autocomplete-suggestion-item')

      this.autocompleteSuggestionsDropdown.appendChild(htmlSuggestion)
    })

    if (this.autocompleteDropdownClickListener !== null) {
      this.autocompleteSuggestionsDropdown.removeEventListener('click', this.autocompleteDropdownClickListener)
    }

    this.autocompleteDropdownClickListener = (event) => {
      let currentNode = event.target

      while (!currentNode.dataset.suggestionValue) {
        currentNode = currentNode.parentElement
      }

      this.onSuggestionClick(currentNode.dataset.suggestionValue)
    }

    this.autocompleteSuggestionsDropdown.addEventListener('click', this.autocompleteDropdownClickListener)
  }

  onSuggestionClick = (suggestion) => {
    this.inputValue = suggestion

    this.updateInputValueInDom()
    this.closeSuggestionsDropdown()
  }

  updateInputValueInDom = () => {
    this.autocompleteInput.value = this.inputValue
  }

  openSuggestionsDropdown = () => {
    this.autocompleteSuggestionsDropdown.classList.add('autocomplete-dropdown-open')
  }

  closeSuggestionsDropdown = () => {
    this.autocompleteSuggestionsDropdown.classList.remove('autocomplete-dropdown-open')
  }
}


const autocompleteSection = document.getElementById('autocomplete-section')

const autocomplete = new Autocomplete(AUTOCOMPLETE_DICTONARY)

autocompleteSection.appendChild(autocomplete)
