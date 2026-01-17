const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TechnicalAnalysesPage = require('../pages/TechnicalAnalysesPage');

let technicalAnalysesPage;

Given('the user has access to the technical analyses management system', async function() {
  technicalAnalysesPage = new TechnicalAnalysesPage(this.page);
  await technicalAnalysesPage.navigateToSystem();
});

Given('the user navigates to the user story OTAPAS-281 details page', async function() {
  await technicalAnalysesPage.navigateToUserStory('OTAPAS-281');
});

When('the user retrieves the list of linked technical analyses from AGAS-21435 to AGAS-21806', async function() {
  await technicalAnalysesPage.retrieveLinkedAnalyses('AGAS-21435', 'AGAS-21806');
});

Then('the complete list of implemented technical analyses should be displayed', async function() {
  const isListDisplayed = await technicalAnalysesPage.isAnalysesListDisplayed();
  expect(isListDisplayed).toBeTruthy();
  const count = await technicalAnalysesPage.getAnalysesCount();
  expect(count).toBeGreaterThan(0);
});

When('the user selects a representative sample of at least 10 technical analyses covering PA PR WM and Responsive categories', async function() {
  await technicalAnalysesPage.selectRepresentativeSample(['PA', 'PR', 'WM', 'Responsive'], 10);
});

Then('the selected analyses should cover different views and functionalities', async function() {
  const categories = await technicalAnalysesPage.getSelectedAnalysesCategories();
  expect(categories).toContain('PA');
  expect(categories).toContain('PR');
  expect(categories).toContain('WM');
  expect(categories).toContain('Responsive');
});

When('the user validates the implementation of each selected technical analysis', async function() {
  await technicalAnalysesPage.validateSelectedAnalysesImplementation();
});

Then('each technical analysis should meet the defined acceptance criteria', async function() {
  const allMeetCriteria = await technicalAnalysesPage.allAnalysesMeetAcceptanceCriteria();
  expect(allMeetCriteria).toBeTruthy();
});

Then('the developed functionalities should match the technical analysis specifications', async function() {
  const matchesSpecifications = await technicalAnalysesPage.functionalitiesMatchSpecifications();
  expect(matchesSpecifications).toBeTruthy();
});

When('the user reviews the implementation status of all linked technical analyses', async function() {
  await technicalAnalysesPage.reviewImplementationStatus();
});

Then('all technical analyses should have status Implemented with no pending items', async function() {
  const allImplemented = await technicalAnalysesPage.allAnalysesImplemented();
  expect(allImplemented).toBeTruthy();
  const pendingCount = await technicalAnalysesPage.getPendingAnalysesCount();
  expect(pendingCount).toBe(0);
});

When('the user validates the integration of all technical analyses as a unified component', async function() {
  await technicalAnalysesPage.validateIntegration();
});

Then('the component should function in an integrated manner without conflicts', async function() {
  const hasConflicts = await technicalAnalysesPage.hasIntegrationConflicts();
  expect(hasConflicts).toBeFalsy();
});

Then('all reported defects related to the technical analyses should be closed', async function() {
  const openDefectsCount = await technicalAnalysesPage.getOpenDefectsCount();
  expect(openDefectsCount).toBe(0);
});