function IlustratorAuth() {
    return (
        <div className="ml-5 hidden lg:block lg:w-[380px] lg:my-auto lg:mx-auto lg:h-[630px] lg:relative">

            <img className="absolute left-3 top-3" src="src/assets/images/logo-large.svg" alt="logo" />

            <img className="h-[630px] rounded-2xl" src="src/assets/images/illustration-authentication.svg" alt="illustration-authentication" />

            <div className="absolute bottom-5 w-[370px] text-white p-2">
                <p className=" font-bold mb-1 text-lg">
                    Keep track of your money
                    <br />
                    and save for your future
                </p>
                <p className="text-sm">
                    Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.
                </p>
            </div>

        </div>
    )
}

export default IlustratorAuth
