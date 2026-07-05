export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: {
    emailAddress: string;
  } | null;
  phoneNumber: {
    phoneNumber: string;
  } | null;
}
