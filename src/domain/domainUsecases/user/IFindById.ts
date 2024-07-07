interface IFindByEmail {
  execute(data: string): Promise<boolean>;
}

export {
  IFindByEmail
}