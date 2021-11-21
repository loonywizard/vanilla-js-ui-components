class ThemeSwitcher {
  constructor() {
    this.initialTheme = this.getInitialTheme()

    document.body.classList.add(`theme-${this.initialTheme}`)
    document.body.classList.add('theme-transition')

    document.addEventListener('DOMContentLoaded', this.initThemeSwitcherElement)
  }

  getInitialTheme = () => {
    const themeFromLocalStorage = localStorage.getItem('theme')
  
    if (themeFromLocalStorage && ['light', 'dark'].includes(themeFromLocalStorage)) {
      return themeFromLocalStorage
    }
  
    const isDarkThemeDetected = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  
    return isDarkThemeDetected ? 'dark' : 'light'
  }

  initThemeSwitcherElement = () => {
    const themeSwitcherElement = document.getElementById('theme-selector')
    const radioInputs = [...themeSwitcherElement.getElementsByTagName('input')]

    radioInputs.forEach((radioInput) => {
      if (radioInput.value === this.initialTheme) radioInput.checked = true

      radioInput.addEventListener('change', this.onInputClick)
    })
  }

  onInputClick = (event) => {
    const theme = event.target.value
    
    document.body.classList.remove('theme-light', 'theme-dark')
    document.body.classList.add(`theme-${theme}`)

    localStorage.setItem('theme', theme)
  }
}

const themeSwitcher = new ThemeSwitcher()
