const { Given, When, Then, And } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RegressionSuitePage = require('../pages/RegressionSuitePage');

let regressionSuitePage;
let testResults;

Given('the regression test suite is properly configured and ready to execute', async function() {
  regressionSuitePage = new RegressionSuitePage(this.page);
  await regressionSuitePage.initializeTestSuite();
  const isReady = await regressionSuitePage.verifyTestSuiteReady();
  expect(isReady).toBe(true);
});

When('I execute the complete regression test suite for value and composition component', async function() {
  testResults = await regressionSuitePage.executeFullRegressionSuite();
  expect(testResults).toBeDefined();
});

Then('all regression tests should execute successfully', async function() {
  const executionStatus = await regressionSuitePage.getExecutionStatus();
  expect(executionStatus.allTestsExecuted).toBe(true);
  expect(executionStatus.criticalFailures).toBe(0);
});

Then('the tests should verify Casa de Bolsa contracts for Persona Fisica and Moral without regressions', async function() {
  const casaBolsaResults = await regressionSuitePage.getCasaBolsaTestResults();
  expect(casaBolsaResults.personaFisica.passed).toBe(true);
  expect(casaBolsaResults.personaMoral.passed).toBe(true);
  expect(casaBolsaResults.regressionDetected).toBe(false);
});

Then('the tests should verify Banco contracts for Persona Fisica and Moral without regressions', async function() {
  const bancoResults = await regressionSuitePage.getBancoTestResults();
  expect(bancoResults.personaFisica.passed).toBe(true);
  expect(bancoResults.personaMoral.passed).toBe(true);
  expect(bancoResults.regressionDetected).toBe(false);
});

Then('the tests should verify all breakdown categories including Fondos de deuda, cobertura, renta variable, Cedes, Mercado dinero and capitales', async function() {
  const breakdownResults = await regressionSuitePage.getBreakdownCategoriesResults();
  expect(breakdownResults.fondosDeuda.passed).toBe(true);
  expect(breakdownResults.fondosCobertura.passed).toBe(true);
  expect(breakdownResults.fondosRentaVariable.passed).toBe(true);
  expect(breakdownResults.cedes.passed).toBe(true);
  expect(breakdownResults.mercadoDinero.passed).toBe(true);
  expect(breakdownResults.mercadoCapitales.passed).toBe(true);
  expect(breakdownResults.allCalculationsCorrect).toBe(true);
});

Then('the tests should verify all supported views Desktop PA, PR, WM and Responsive without regressions', async function() {
  const viewResults = await regressionSuitePage.getViewTestResults();
  expect(viewResults.desktopPA.passed).toBe(true);
  expect(viewResults.desktopPR.passed).toBe(true);
  expect(viewResults.desktopWM.passed).toBe(true);
  expect(viewResults.responsiveLandscape.passed).toBe(true);
  expect(viewResults.responsivePortrait.passed).toBe(true);
  expect(viewResults.regressionDetected).toBe(false);
});

Then('a regression report should be generated documenting all identified regressions', async function() {
  const report = await regressionSuitePage.generateRegressionReport();
  expect(report.generated).toBe(true);
  expect(report.timestamp).toBeDefined();
  expect(report.totalTestsRun).toBeGreaterThan(0);
  expect(report.regressionsDocumented).toBeDefined();
});