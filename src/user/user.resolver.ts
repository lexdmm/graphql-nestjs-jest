import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from './dto/create-user.input'
import { User } from './user.entity'
import { UserService } from './user.service'

// Resolver é o cara que vai ter as entradas e saídas da aplicação
@Resolver('User')
export class UserResolver {
    constructor(private _userService: UserService) {}

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const users = await this._userService.findAllUsers()
        return users
    }

    @Mutation(() => User)
    async createUser(@Args('data') data: CreateUserInput): Promise<User> {
        const user = await this._userService.createUser(data)
        return user
    }
}
