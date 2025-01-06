import { UploadedFile } from "express-fileupload"

interface Options {
    name: string,
    file: UploadedFile
}

interface Constructor {
    name?: string
    avatar?: UploadedFile

}

export class UpdateDto {
    private constructor(
        readonly name?: string,
        readonly avatar?: UploadedFile
    ) { }

    static create(options: Partial<Options>, regexValidateExtensionImage: RegExp): [string?, UpdateDto?] {
        const { name, file } = options

        if (!name && !file) return ["some property to be updated must come",]

        if (name && name.length < 6) return ["The name must be greater than 6 characters",]

        if (file && !regexValidateExtensionImage.test(file.mimetype ?? "")) return ["Valid files for the avatar are png, jpg, jpeg",]



        return [undefined, new UpdateDto(name, file)]

    }
}