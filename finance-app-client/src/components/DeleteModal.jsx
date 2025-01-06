import useDelete from "../hooks/useDelete"
import Button from "./Button"

function DeleteModal({ category, handleClose, id, type = "budget" }) {

    const mutation = useDelete(type)

    function deleteItem() {
        mutation.mutate(id)
        handleClose()
    }

    return (
        <section className="bg-white rounded-xl p-5 w-[355px] max-w-[90%] mx-auto">
            <h2 className="text-gray-900 text-xl font-bold">Delete ‘{category}’?</h2>
            <p className="my-3 text-gray-500">Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</p>

            <Button disabled={mutation.isLoading} onClick={deleteItem} className="bg-Red text-white p-3 w-full hover:bg-red-500">
                Yes, Confirm Deletion
            </Button>

            <Button onClick={handleClose} className="text-gray-500 w-full mt-5">
                No, I want to go back
            </Button>
        </section>
    )
}

export default DeleteModal
