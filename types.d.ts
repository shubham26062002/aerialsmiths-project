type JWTPayload = {
    sub: string,
    sid: string,
    role: "admin" | "default",
    iat?: number,
    exp?: number,
}