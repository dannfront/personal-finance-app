
export function numberFormat(number) {
    return new Intl.NumberFormat("en-Us", { style: "currency", currency: "USD" }).format(number)
}