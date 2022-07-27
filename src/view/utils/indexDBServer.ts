import Dexie, { Table } from 'dexie'

interface Friends {
        msgIndex?: number,
        friendEnd: string,
        userEnd: string
}
export class IndexDBServer extends Dexie {

    3214!: Table<Friends>
    constructor(){
        super('msgDatabases')
        this.version(1).stores({
            3214: "++msgIndex"
        })
    }
}


// export const testDexie = () => 
//     db.version(1).stores({
//         ftiends: '12121'
//     })
