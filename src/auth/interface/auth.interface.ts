export interface IAuthenticate {
  readonly user: {
    id: string;
    firstName: string;
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
