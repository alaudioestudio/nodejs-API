export interface CreateUserParams {
  email: string
  password: string
  cliente_id: string
  name: string
}

export interface UserRetorno {
  id: string
  email: string
  name: string
  ind_primeiro_acesso: boolean
  roles: string[]
  createdAt: string
  updatedAt: string
}
