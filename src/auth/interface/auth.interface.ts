export interface IAuthenticate {
  readonly user: {
    id: string;
    name: string;
    email: string;
    password: undefined;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
  };
  readonly authorization: {
    token: string;
  };
}
