// TODO:
// use event delegation!

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

  dropdownOptions.forEach((dropdownOption) => {
    dropdownOption.addEventListener('click', function onDropdownOptionClick(event) {
      event.stopPropagation()

      dropdownContent.classList.remove('dropdown-content-open')
      dropdownOptions.forEach(
        (_innerDropdownOption) => _innerDropdownOption.classList.remove('selected-dropdown-option')
      )
      dropdownOption.classList.add('selected-dropdown-option')
      dropdownButton.innerHTML = `Selected option: ${dropdownOption.dataset.optionValue}`
    })
  })
}


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
