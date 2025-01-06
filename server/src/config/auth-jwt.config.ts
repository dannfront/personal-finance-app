import jwt, { Jwt, JwtPayload } from "jsonwebtoken"

interface Decoded {
    id: string,
    iat: number,
    exp: number
}
// { id: '672e804b57d8fef5658063e6', iat: 1731102728, exp: 1731189128 }
export class AuthJWT {


    static signJwt(payload: any, privateKey: string, duration: string): Promise<string | undefined> {

        return new Promise((resolve, reject) => {
            jwt.sign(payload, privateKey, { expiresIn: duration }, (err, token) => {
                if (err) {
                    console.log(err);
                    return resolve(undefined)
                }
                resolve(token)
            })
        })

    }

    static verifyJwt(token: string, secret: string): Promise<Decoded | undefined> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) resolve(undefined)

                resolve(decoded as Decoded)
            })
        })
    }
}