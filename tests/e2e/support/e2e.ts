import './commands';

Cypress.on('uncaught:exception', (err) => {
  // Ignore Vite dynamic module import failures and Nuxt DevTools noise
  if (
    err.message.includes('error loading dynamically imported module') ||
    err.message.includes('@nuxt/devtools')
  ) {
    return false; // Prevents Cypress from failing the test
  }
});

// tunneling issue
Cypress.on('uncaught:exception', (err) => {
  return !(err.message.includes('WebSocket closed') || err.message.includes('HMR'));
});
