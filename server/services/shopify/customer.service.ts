import type { H3Event } from 'h3';
import { $fetch } from 'ofetch';
import type { Customer } from '~~/types/Customer';

// query
const GET_CUSTOMER_QUERY = `
  query getCustomer {
    customer {
      id
      firstName
      lastName
      emailAddress {
        emailAddress
      }
      phoneNumber {
        phoneNumber
      }
    }
  }
`;

export async function getCustomer(
  event: H3Event,
  accessToken: string,
): Promise<Customer> {
  const config = useRuntimeConfig(event);

  const response = await $fetch<{
    data: {
      customer: Customer;
    };
    errors?: { message: string }[];
  }>(config.shopifyCustomerApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: accessToken,
    },

    body: JSON.stringify({
      query: GET_CUSTOMER_QUERY,
    }),
  });

  return response.data.customer;
}
