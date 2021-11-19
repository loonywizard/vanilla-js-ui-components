const MODAL_CONTENT = {
  helloWorld: `<p>Hello, World!</p>`,
  longText: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
  `,
}

// TODO: add animation for appereance
function openModal(buttonHtmlElement) {
  /*
  
  - create css overlay over the hole page
  - create modal window centered horizontally and vertically
  - add `close` button for closing modal
  - add event listener for click outside if `data-close-on-click-outside` is not false

  */
  const modalContent = MODAL_CONTENT[buttonHtmlElement.dataset.modalContent]
  const shouldCloseOnClickOutside = buttonHtmlElement.dataset.closeOnClickOutside !== 'false'

  const modalOverlay = document.createElement('div')
  const modalContainer = document.createElement('div')
  const modalTextWrapper = document.createElement('div')
  const closeModalButton = document.createElement('button')

  // there can be only one modal, so id is unique
  modalOverlay.id = 'modal-overlay'
  
  modalOverlay.classList.add('modal-overlay')
  modalContainer.classList.add('modal-container')
  modalTextWrapper.classList.add('modal-text-wrapper')


  modalTextWrapper.innerHTML = modalContent
  closeModalButton.innerHTML = 'Close Modal'

  closeModalButton.addEventListener('click', closeModal)

  if (shouldCloseOnClickOutside) {
    modalOverlay.addEventListener('click', function handleClickOutside(event) {
      if (event.target === modalContainer) return
      if (!event.target.contains(modalContainer)) return

      closeModal()
    })
  }

  modalContainer.append(modalTextWrapper, closeModalButton)
  modalOverlay.append(modalContainer)
  document.body.append(modalOverlay)
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay')

  // we can use modalOverlay.remove(), but it doesn't work in IE
  modalOverlay.parentElement.removeChild(modalOverlay)
}

const openModalButtons = [...document.querySelectorAll('[data-open-modal-button]')]

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => openModal(button))
})
