import 'dotenv/config'

export let token: string  = process.env.CLIENT_TOKEN;
export let prefix: string = process.env.PREFIX;
export let owners: string[] = [];