import { hexColorRegex, hslColorRegex, rgbColorRegex } from "../../../config/regexs.config"

interface Options {
    name: string,
    target: number,
    theme?: string
}

export class CreateDto {
    private constructor(
        public readonly name: string,
        public readonly target: number,
        public readonly theme?: string,
    ) { }


    static create(body: Options): [string?, CreateDto?] {

        const { name, target, theme } = body

        if (typeof name !== "string") return ["name must be a string",]

        if (!name) return ["name is required",]

        if (!target) return ["target is required",]

        if (typeof target !== "number") return ["target must be a number",]



        if (target <= 0) return ["target must be greater than 0",]


        if (theme && !hexColorRegex.test(theme) && !hslColorRegex.test(theme) && !rgbColorRegex.test(theme))
            return ["The theme format should only be RGB, HEX and HSL",]

        return [, new CreateDto(name, target, theme)]
    }
}