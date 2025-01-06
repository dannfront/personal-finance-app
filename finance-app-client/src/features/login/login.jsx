import FormAuth from "../../layouts/layoutAuth/components/FormAuth"
import TitleAuth from "../../layouts/layoutAuth/components/TitleAuth"
import SectionLayout from "../../layouts/layoutAuth/components/SectionLayout"

function Login() {
    return (
        <SectionLayout>
            <TitleAuth title="Login" />

            <FormAuth />

        </SectionLayout>
    )
}

export default Login