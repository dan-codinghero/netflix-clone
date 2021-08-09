// const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';

export async function compareHash(moniker: string, hash: string) {
    return await bcrypt.compare(moniker, hash);
}

export async function generateHash(moniker: string, salt: number) {
    return await bcrypt.hash(moniker, salt);
}
