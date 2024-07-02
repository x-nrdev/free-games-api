// Blur page when menu is opened
export const updatePageBlur = () => {
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')

    main.classList.toggle('blur')
    footer.classList.toggle('blur')
}

// Remove scroll when menu is opened
export const updateScrollStatus = () => {
    const navMenu = document.querySelector('button.menu')
    navMenu.addEventListener('click', () => {
        const bodyClass = document.body.classList
        navMenu.classList.contains('opened') ? bodyClass.add('no-scroll') : bodyClass.remove('no-scroll')

        updatePageBlur()
    })
}

// Update category buttons
export const updateActiveButton = (activeButton, inactiveButton) => {
    activeButton.classList.remove('active')
    inactiveButton.classList.add('active')
}

// Update loading state
export const updateLoadingState = isLoading => {
    const loading = document.querySelector('.loading')
    isLoading ? loading.classList.add('active') : loading.classList.remove('active')
}

// Reset Filter
export const resetFilter = () => {
    const filterResetBtn = document.querySelector('.reset-btn')
    const filterDropdownCheckbox = document.querySelector('#filter-dropdown')
    filterResetBtn.click()
    filterDropdownCheckbox.checked = false
}