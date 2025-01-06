import Button from "./Button"
import TitlePage from "./TitlePage"

function HeaderPage({ title, childrenButton, onClick, isRenderButton = false }) {
    return (
        <header className="flex items-center justify-between">

            <TitlePage>
                {title}
            </TitlePage>

            {isRenderButton &&

                <Button onClick={onClick} className=" bg-Grey-900 text-white p-2 w-[250px] h-[53px] hover:bg-gray-500 my-3">
                    {childrenButton}
                </Button>
            }

        </header >
    )
}

export default HeaderPage
