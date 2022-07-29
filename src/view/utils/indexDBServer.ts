import Dexie, { Table } from 'dexie'

interface Friends {
        msgIndex?: number,
        friendEnd: string,
        userEnd: string,
        friendId: number,
        userId: number
}
export class IndexDBServer extends Dexie {

    3214!: Table<Friends>
    constructor(){
        super('msgDatabases')
        this.version(1).stores({
            3214: "++msgIndex, friendId, userId"
        })
    }
}


// export const testDexie = () => 
//     db.version(1).stores({
//         ftiends: '12121'
//     })
