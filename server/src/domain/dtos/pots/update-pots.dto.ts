import { hexColorRegex, hslColorRegex, rgbColorRegex } from "../../../config/regexs.config"

interface Options {
    name: string,
    target: number
    theme?: string
}

export class UpdatePotsDto {
    private constructor(
        public readonly name?: string,
        public readonly target?: number,
        public readonly theme?: string
    ) { }

    static create(body: Partial<Options>): [string?, UpdatePotsDto?] {

        const { name, target, theme } = body

        if (!name && !target && !theme) return ["One of the properties of name, target, or theme must be provided",]

        if (name !== undefined && typeof name !== "string") return ["name must be a string",]

        if (target !== undefined && typeof target !== "number") return ["target must be a number",]

        if (target && target <= 0) return ["target must be greater than zero"]

        if (theme && !hexColorRegex.test(theme) && !hslColorRegex.test(theme) && !rgbColorRegex.test(theme))
            return ["The theme format should only be RGB, HEX and HSL",]

        return [, new UpdatePotsDto(name, target, theme)]
    }
}