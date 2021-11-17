// TODO:
// write option to dropdown button
// close on item select
// close on click outside

function addEventListenersForDropdown(dropdown) {
  const dropdownButton = dropdown.getElementsByClassName('dropdown-button')[0]
  const dropdownContent = dropdown.getElementsByClassName('dropdown-content')[0]

  if (!dropdownButton || !dropdownContent) return

  dropdownButton.addEventListener('click', function onDropdownButtonClick() {
    dropdownContent.classList.toggle('dropdown-content-open')
  })
}


const allDropdownContainers = [...document.getElementsByClassName('dropdown-container')]

allDropdownContainers.forEach(addEventListenersForDropdown)
