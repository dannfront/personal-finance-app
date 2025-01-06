
function ItemTransactions({ transaction }) {

    const { avatar, name, category, amount, date } = transaction
    const dateFormat = new Date(date)
    function usdFormater(amount = 0) {
        return new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "USD"
        }).format(amount)

    }

    return (
        <li className="p-1 md:p-2">
            <section className="grid-item__transaction mt-2">
                <figure className="w-[40px]">
                    <img className="rounded-full" src={`src/${avatar.slice(1)}`} alt="avatar" />
                </figure>
                <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-Grey-500">{category}</p>
                </div>

                <div>

                    <p className={`font-bold ${amount > 0 ? "text-Green" : ""}`}>
                        {usdFormater(amount)}
                    </p>

                    <time className="text-Grey-500" dateTime={dateFormat}>{`${dateFormat.getDate()} ${dateFormat.toLocaleDateString("en-EU", { month: "short" })} ${dateFormat.getFullYear()}`}</time>

                </div>
            </section>
        </li>
    )
}

export default ItemTransactions
