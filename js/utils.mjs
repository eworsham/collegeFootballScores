// Function to render template into view
export function renderWithTemplate(template, parentElement) {
    parentElement.insertAdjacentHTML('afterbegin', template)
}

// Function to load template
async function loadTemplate(path) {
    const res = await fetch(path)
    const template = await res.text()
    return template
}

// Function to load the header and footer into view
export async function loadHeaderFooter() {
    const headerTemplate = await loadTemplate('/views/partials/header.html')
    const footerTemplate = await loadTemplate('/views/partials/footer.html')

    const header = document.querySelector('#header')
    const footer = document.querySelector('#footer')

    renderWithTemplate(headerTemplate, header)
    renderWithTemplate(footerTemplate, footer)
}