import Button from "../../../components/Button"

function BtnSelect({ children, onClick }) {
    return (
        <Button onClick={onClick} className="border border-Beige-500 rounded-lg flex justify-between items-center w-full p-3">
            {
                children
            }
        </Button>
    )
}

export default BtnSelect
