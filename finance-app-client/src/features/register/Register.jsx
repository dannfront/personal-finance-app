import FormAuth from "../../layouts/layoutAuth/components/FormAuth"
import SectionLayout from "../../layouts/layoutAuth/components/SectionLayout"
import TitleAuth from "../../layouts/layoutAuth/components/TitleAuth"

function Register() {
    return (
        <SectionLayout>
            <TitleAuth title="Sign Up" />

            <FormAuth isRegister={true} />
        </SectionLayout>
    )
}

export default Register
