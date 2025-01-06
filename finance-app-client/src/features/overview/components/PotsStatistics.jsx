import CategoryBar from "../../../components/CategoryBar"
import LinkSee from "../../../components/LInkSee"
import { numberFormat } from "../../../utils/functions"

function PotsStatistics({ pots, allPots }) {

    const totalAmount = allPots.reduce((acc, pot) => acc + pot.total, 0)


    return (
        <section className="w-full m-w-[90%] bg-white rounded-lg p-5 mt-5">
            <header className="flex justify-between items-center">
                <h2 className="font-bold text-xl">Pots</h2>
                <LinkSee textButton="See Details" to="/pots" />
            </header>
            <div className="md:flex">

                <article className="w-[300px] m-w-[90%] md:w-[247px] bg-Beige-100 rounded-lg flex items-center gap-5 mx-auto md:m-0 p-3 my-2">
                    <figure>
                        <img src="src/assets/images/icon-pot.svg" alt="icon-pot" />
                    </figure>
                    <div>

                        <p className="text-Grey-500 text-sm">Total Saved</p>
                        <p className="font-bold text-2xl md:text-3xl"
                        >{numberFormat(totalAmount)}</p>
                    </div>
                </article>

                <article className="flex flex-wrap gap-5 md:w-[350px] md:justify-center">
                    {pots.map((pot, i) => <CategoryBar key={i} theme={pot.theme} title={pot.name} amount={pot.total} />)}
                </article>
            </div>
        </section>
    )
}

export default PotsStatistics
