import { CyHttpMessages } from 'cypress/types/net-stubbing';

export abstract class AbstractMockHelper {
  protected mockGet<T>(
    url: string,
    body: T,
    statusCode: number,
    alias: string,
  ): void {
    cy.intercept('GET', url, {
      statusCode,
      body,
      headers: {
        'access-control-allow-origin': '*', // Prevents "Not allowed" CORS errors
      },
    }).as(alias);
  }

  protected mockPost<T>(
    url: string,
    body: T | ((request: CyHttpMessages.IncomingHttpRequest) => void),
    statusCode = 200,
    alias = '',
  ): Cypress.Chainable {
    const interceptor = cy.intercept('POST', url, (request) => {
      if (typeof body === 'function') {
        (body as (request: CyHttpMessages.IncomingHttpRequest) => void)(request);
        return;
      }

      request.reply({
        statusCode,
        body,
      });
    });

    return alias ? interceptor.as(alias) : interceptor;
  }

  protected arrangeUrlQuery(
    params: Record<string, string> | URLSearchParams = {},
  ): string {
    return params instanceof URLSearchParams
      ? params.toString()
      : new URLSearchParams(params).toString();
  }
}
