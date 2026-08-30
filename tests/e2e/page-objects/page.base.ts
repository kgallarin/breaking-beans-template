export abstract class AbstractPageObject {
  protected abstract pageUrl: string;

  visit(routeParams?: URLSearchParams | Record<string, string>) {
    if (routeParams) {
      const query =
        routeParams instanceof URLSearchParams
          ? routeParams.toString()
          : new URLSearchParams(routeParams).toString();

      return cy.visit(`${this.pageUrl}?${query}`);
    }

    return cy.visit(this.pageUrl);
  }
}
