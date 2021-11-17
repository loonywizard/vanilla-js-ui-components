// TODO:
// close on click outside
// use event delegation!

function addEventListenersForDropdown(dropdown) {
  const dropdownButton = dropdown.getElementsByClassName('dropdown-button')[0]
  const dropdownContent = dropdown.getElementsByClassName('dropdown-content')[0]
  const dropdownOptions = [...dropdown.getElementsByClassName('dropdown-option')]

  if (!dropdownButton || !dropdownContent || !dropdownOptions) return

  dropdownButton.addEventListener('click', function onDropdownButtonClick() {
    dropdownContent.classList.toggle('dropdown-content-open')
  })

  dropdownOptions.forEach((dropdownOption) => {
    dropdownOption.addEventListener('click', function onDropdownOptionClick() {
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
