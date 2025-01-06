import { useEffect } from "react"
import { createPortal } from "react-dom"

function ModalPortal({ children, handleCloseModal, keyModal }) {
    useEffect(() => {
        function closeModal(e) {
            const target = e.target

            if (target.classList.contains(keyModal)) {
                return handleCloseModal()
            }
        }
        function keyCloseModal(e) {
            if (e.key === "Escape") {
                handleCloseModal()
            }
        }
        window.addEventListener('click', closeModal)
        window.addEventListener('keyup', keyCloseModal)

        return () => {
            window.removeEventListener("click", closeModal)
            window.addEventListener('keyup', keyCloseModal)

        }
    }, [handleCloseModal, keyModal])
    return (
        createPortal(
            <div className={`${keyModal} fixed z-10 bg-black/50 top-0 left-0 w-full h-screen content-center mx-auto`}>
                {children}
            </div>,
            document.body
        )
    )
}

export default ModalPortal
