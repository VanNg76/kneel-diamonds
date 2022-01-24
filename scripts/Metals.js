import { getMetals, setMetal } from "./database.js"

const metals = getMetals()

export const Metals = () => {
    let html = "<ul>"

    // This is how you have been converting objects to <li> elements
    for (const metal of metals) {
        html += `<li>
            <input type="radio" name="metal" value="${metal.id}" /> ${metal.metal}
        </li>`
    }

    html += "</ul>"
    return html
}

document.addEventListener(
    "change",
    (event) => {
        const clickedItem = event.target
        if (clickedItem.name === "metal") {
            setMetal(parseInt(clickedItem.value))
        }
    }
)