import { getOrders, addCustomOrder, setType } from "./database.js"
import { getMetals, getSizes, getStyles, getTypes } from "./database.js"

const metals = getMetals()
const sizes = getSizes()
const styles = getStyles()
const types = getTypes()

// Create a temporary object and sum total price
const buildOrderListItem = (order) => {
    let totalCost = 0
    
    // Use for...of loop
    for (const metal of metals) {
        if (metal.id === order.metalId) {
            totalCost += metal.price
        }
    }

    // Use .find()
    sizes.find(size => {
        if (size.id === order.sizeId) {
            return totalCost += size.price
        }
    })

    // Use for...of loop
    for (const style of styles) {
        if (style.id === order.styleId) {
            totalCost += style.price
        }
    }

    let name = ""

    if (order.typeId === 1) {
        name = findTypeName(1)
    } else if (order.typeId === 2) {
        totalCost *= 2
        name = findTypeName(2)
    } else if (order.typeId === 3) {
        totalCost *= 3
        name = findTypeName(3)
    }

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return `<li>
        Order #${order.id} was placed on ${new Date(order.timestamp).toLocaleString()}, costs ${costString}, is a ${name}
    </li>`
}

// Display orders into a list
export const Orders = () => {
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(order => buildOrderListItem(order))

    html += listItems.join("")
    html += "</ul>"

    return html
}

// "Create order" Button click event
document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "orderButton") {
            addCustomOrder()
        }
    }
)

// Custom type of jewelry order
export const Types = () => {
    let html = `<ul class="jewelry-type">`
    
    // This is how you have been converting objects to <li> elements
    for (const type of types) {
        html +=
        `<li>
            <input type="radio" name="type" value="${type.id}" /> ${type.typeName}
        </li>`
    }

    html += "</ul>"
    return html
}

// Create change event for type of jewelry and calcuate final price
document.addEventListener(
    "change",
    (event) => {
        const clickedItem = event.target
        if (clickedItem.name === "type") {
            setType(parseInt(clickedItem.value))
        }
    }
)

// Create function find typeName from typeId
const findTypeName = (findId) => {
    let result = ""
    types.map(type => {
        if (type.id === findId) {
            result = type.typeName
        }
    })

    return result
}