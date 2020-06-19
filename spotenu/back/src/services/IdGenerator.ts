import {v4} from 'uuid'

export default class IdGenerator {
    public idGenerator(){
        return v4()
    }
}