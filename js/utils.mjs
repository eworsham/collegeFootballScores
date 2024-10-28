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

export function getCurrentWeek() {
    const today = new Date()

    const week1 = new Date('09/02/2024')
    const week2 = new Date('09/08/2024')
    const week3 = new Date('09/15/2024')
    const week4 = new Date('09/22/2024')
    const week5 = new Date('09/29/2024')
    const week6 = new Date('10/06/2024')
    const week7 = new Date('10/13/2024')
    const week8 = new Date('10/20/2024')
    const week9 = new Date('10/27/2024')
    const week10 = new Date('11/03/2024')
    const week11 = new Date('11/10/2024')
    const week12 = new Date('11/17/2024')
    const week13 = new Date('11/24/2024')
    const week14 = new Date('12/01/2024')
    const week15 = new Date('12/14/2024')

    if (today < week1) return 1
    else if (today < week2) return 2
    else if (today < week3) return 3
    else if (today < week4) return 4
    else if (today < week5) return 5
    else if (today < week6) return 6
    else if (today < week7) return 7
    else if (today < week8) return 8
    else if (today < week9) return 9
    else if (today < week10) return 10
    else if (today < week11) return 11
    else if (today < week12) return 12
    else if (today < week13) return 13
    else if (today < week14) return 14
    else if (today < week15) return 15
    else return 16
}