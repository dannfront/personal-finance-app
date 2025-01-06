function BudgetTransactionItemList({ transactions }) {

    const { name, amount, date, avatar } = transactions


    return (
        <li className="flex justify-between items-center py-2">
            <div className="flex gap-3">
                <img className=" size-8 rounded-full" src={`http://localhost:3000/static/${avatar.split("/").splice(2).join("/")


                    }`} alt={name} />
                <h4 className="font-bold text-gray-900">{name}</h4>
            </div>
            <div >
                <span className="block text-right font-bold">${amount}</span>
                <time className="text-gray-500" dateTime={date}>{`${date}`.split("T").at(0)}</time>
            </div>
        </li>
    )
}

export default BudgetTransactionItemList
