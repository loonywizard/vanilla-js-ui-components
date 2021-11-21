function setThemeFromLocalStorage() {
  const themeFromLocalStorage = localStorage.getItem('theme')

  if (themeFromLocalStorage && ['light', 'dark'].includes(themeFromLocalStorage)) {
    document.body.classList.add(`theme-${themeFromLocalStorage}`)
  } else {
    const isDarkThemeDetected = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const themeClass = isDarkThemeDetected ? 'theme-dark' : 'theme-light'

    document.body.classList.add(themeClass)
  }
}

setThemeFromLocalStorage()
