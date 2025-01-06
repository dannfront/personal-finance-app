import { useState } from "react";
import { useForm } from "react-hook-form";
import { numberFormat } from "../../../utils/functions";
import Button from "../../../components/Button";
import useWithdraw from "../../../hooks/useWithdraw";

function Withdraw({ handleCloseModal, target, total, theme, id }) {
    const mutation = useWithdraw()
    const [targetWithdraw, setTargetWithdraw] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        mutation.mutate({ id, amount: +data.amount })
        handleCloseModal();
    };

    const handleInputChange = (e) => {
        const value = parseFloat(e.target.value);
        setTargetWithdraw(value);
    };


    const progressWidth = (total - targetWithdraw) / target * 100;

    return (
        <section className="bg-white mx-auto max-w-[90%]] w-[350px] rounded-lg p-5 md:w-[500px]">
            <header className="mb-5">
                <h1 className="text-gray-900 text-2xl font-bold">Withdraw from ‘Savings’</h1>
                <p className="text-Beige-500 mt-3">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
                </p>
            </header>

            <div className="flex justify-between">
                <p className="text-Beige-500">New Amount</p>
                <h2 className="font-bold text-Grey-900 text-2xl">{numberFormat(total - targetWithdraw)}</h2>
            </div>

            <div className="w-full h-2 rounded-full bg-Beige-100 my-5">
                <div className="progress" style={{ backgroundColor: theme, width: `${progressWidth}%` }}></div>
            </div>
            <form id="form-withdraw" onSubmit={handleSubmit(onSubmit)}>
                <div className="">
                    <label htmlFor="withdraw" className="font-bold text-Grey-500 text-sm">Amount to Withdraw</label>
                    <input
                        className="border border-Beige-500 p-2 w-full rounded-lg"
                        type="number"
                        id="withdraw"
                        min={1}
                        {...register("amount", {
                            required: {
                                value: true,
                                message: "field is required"
                            },
                            max: {
                                value: total,
                                message: "You can't withdraw more than the total"
                            }
                        })}
                        onChange={handleInputChange}
                        max={total}
                    />
                    {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
                </div>
                <Button className="bg-gray-950 text-white w-full p-5 mt-5" form idform="form-withdraw">
                    Withdraw
                </Button>
            </form>
        </section>
    );
}

export default Withdraw;