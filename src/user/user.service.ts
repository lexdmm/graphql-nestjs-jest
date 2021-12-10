import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserInput } from './dto/create-user.input'
import { User } from './user.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) //Ta dizendo que o papel de criar a instancia é do repositório
        private _userRepository: Repository<User>,
    ) { }

    async createUser(data: CreateUserInput): Promise<User> {
        const user = await this._userRepository.create(data)
        const userSaved = await this._userRepository.save(user)

        if (!userSaved) {
            throw new InternalServerErrorException(
                'Ocorreu um erro ao criar o usuário.',
            )
        }
        return userSaved
    }
}
