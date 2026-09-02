export abstract class AbstractMockHelper {
  protected mockGet<T>(
    url: string,
    body: T,
    statusCode: number,
    alias: string,
  ): Cypress.Chainable {
    return cy
      .intercept('GET', url, {
        statusCode,
        body,
        headers: {
          'access-control-allow-origin': '*', // Prevents "Not allowed" CORS errors
        },
      })
      .as(alias);
  }

  protected mockPost<T>(
    url: string,
    body: T,
    statusCode = 200,
    alias: string,
  ): Cypress.Chainable {
    return cy
      .intercept('POST', url, {
        statusCode,
        body,
      })
      .as(alias);
  }

  protected arrangeUrlQuery(
    params: Record<string, string> | URLSearchParams = {},
  ): string {
    return params instanceof URLSearchParams
      ? params.toString()
      : new URLSearchParams(params).toString();
  }
}
