interface jwtConfig {
  secret: string
  expireIn: string
}

export const jwtConfig: jwtConfig = {
  secret: 'sadhasjdhsahdsahjdashjhdasjhdassecrete',
  expireIn: '3d',
}
