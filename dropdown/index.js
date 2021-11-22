function generateDropdownHTML(numberOfOptions) {
  const dropdownSection = document.getElementById('dropdown-section')

  const dropdownContainer = document.createElement('div')
  const dropdownButton = document.createElement('button')
  const dropdownContent = document.createElement('div')
  const dropdownOptionsList = document.createElement('ul')

  dropdownContainer.classList.add('dropdown-container')
  dropdownButton.classList.add('dropdown-button')
  dropdownContent.classList.add('dropdown-content')

  dropdownButton.innerHTML = `No option chosen: choose one of ${numberOfOptions} options`

  for (let i = 1; i <= numberOfOptions; i++) {
    const dropdownOption = document.createElement('li')

    dropdownOption.classList.add('dropdown-option')
    dropdownOption.dataset.optionValue = `option${i}`
    dropdownOption.tabIndex = 0
    dropdownOption.innerHTML = `Option ${i}`

    dropdownOptionsList.appendChild(dropdownOption)
  }

  dropdownContent.appendChild(dropdownOptionsList)
  dropdownContainer.appendChild(dropdownButton)
  dropdownContainer.appendChild(dropdownContent)
  dropdownSection.appendChild(dropdownContainer)
}


function addEventListenersForDropdown(dropdown) {
  const dropdownButton = dropdown.getElementsByClassName('dropdown-button')[0]
  const dropdownContent = dropdown.getElementsByClassName('dropdown-content')[0]
  const dropdownOptions = [...dropdown.getElementsByClassName('dropdown-option')]

  if (!dropdownButton || !dropdownContent || !dropdownOptions) return

  dropdownButton.addEventListener('click', function onDropdownButtonClick() {
    const wasOpenBeforeEventFired = dropdownContent.classList.contains('dropdown-content-open')

    // close all other dropdowns before opening this one
    if (!wasOpenBeforeEventFired) {
      const dropdownContents = [...document.getElementsByClassName('dropdown-content')]

      dropdownContents.forEach((dropdownContent) => {
        dropdownContent.classList.remove('dropdown-content-open')
      })
    }
    
    if (!wasOpenBeforeEventFired) {
      dropdownContent.classList.add('dropdown-content-open')
    } else {
      dropdownContent.classList.remove('dropdown-content-open')
    }
  })

  // event delegation here!
  dropdownContent.addEventListener('click', (event) => {
    event.stopPropagation()

    const selectedValue = event.target.dataset.optionValue

    dropdownContent.classList.remove('dropdown-content-open')
    dropdownOptions.forEach((dropdownOption) => {
      if (dropdownOption.dataset.optionValue === selectedValue) {
        dropdownOption.classList.add('selected-dropdown-option')
      } else {
        dropdownOption.classList.remove('selected-dropdown-option')
      }
    })
    
    dropdownButton.innerHTML = `Selected option: ${selectedValue}`
  })
}

generateDropdownHTML(4)
generateDropdownHTML(20)

const allDropdownContainers = [...document.getElementsByClassName('dropdown-container')]
allDropdownContainers.forEach(addEventListenersForDropdown)

document.addEventListener('click', function closeDropdownsOnClickOutside(event) {
  if (!event.target.matches('.dropdown-button')) {
    const dropdownContents = [...document.getElementsByClassName('dropdown-content')]

    dropdownContents.forEach((dropdownContent) => {
      dropdownContent.classList.remove('dropdown-content-open')
    })
  }
})
