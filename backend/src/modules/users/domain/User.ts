export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  INVENTORY_MANAGER = 'INVENTORY_MANAGER',
  AUDITOR = 'AUDITOR',
}

export interface IUserProps {
  id?: string;
  email: string;
  password?: string;
  username: string;
  role: UserRole;
  isTemporaryPass: boolean;
  isActive?: boolean;
  createdBy?: string;
  updatedBy?: string;
}

export class User {
  private constructor(private props: IUserProps) {}

  public static create(props: IUserProps): User {
    if (!props.email) throw new Error('Email is required');
    if (!props.username) throw new Error('Username is required');
    if (!props.id) {
      props.isTemporaryPass = true;
    }
    if (props.isActive === undefined) {
      props.isActive = true;
    }
    if (!props.role) throw new Error('Rol is required');

    return new User(props);
  }

  get properties(): IUserProps {
    return { ...this.props };
  }
}
