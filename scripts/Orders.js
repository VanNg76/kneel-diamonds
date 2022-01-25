import { getOrders, addCustomOrder } from "./database.js"
import { getMetals, getSizes, getStyles } from "./database.js"

const metals = getMetals()
const sizes = getSizes()
const styles = getStyles()

const buildOrderListItem = (order) => {
    let totalCost = 0
    for (const metal of metals) {
        if (metal.id === order.metalId) {
            totalCost += metal.price
        }
    }

    const temp = sizes.find(size => {
        if (size.id === order.sizeId) {
            return totalCost += size.price
        }
    })

    for (const style of styles) {
        if (style.id === order.styleId) {
            totalCost += style.price
        }
    }

    const costString = totalCost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
    })

    return `<li>
        Order #${order.id} was placed on ${new Date(order.timestamp).toLocaleString()}, costs ${costString}
    </li>`
}

export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(order => buildOrderListItem(order))

    html += listItems.join("")
    html += "</ul>"

    return html
}

document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "orderButton") {
            addCustomOrder()
        }
    }
)