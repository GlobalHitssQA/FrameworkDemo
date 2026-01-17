const { expect } = require('@playwright/test');

class SoldPlanPage {
  constructor(page) {
    this.page = page;
    
    // Line Provisioning Locators
    this.lineProvisioningSection = '[data-testid="line-provisioning-section"]';
    this.soldPlanOption = '[data-testid="plan-option-sold"]';
    this.apn2ConfigCheckbox = '[data-testid="apn2-config-checkbox"]';
    this.internetNavigationOption = '[data-testid="apn2-internet-navigation"]';
    this.fotaOption = '[data-testid="apn2-fota-option"]';
    this.provisionLineButton = '[data-testid="provision-line-btn"]';
    this.provisioningSuccessMessage = '[data-testid="provisioning-success-msg"]';
    this.userAuthenticatedIndicator = '[data-testid="user-authenticated-indicator"]';
    
    // Traffic Simulator Locators
    this.trafficSimulatorSection = '[data-testid="traffic-simulator-section"]';
    this.apn2TrafficInput = '[data-testid="apn2-traffic-mb-input"]';
    this.generateTrafficButton = '[data-testid="generate-traffic-btn"]';
    this.trafficConfirmationMessage = '[data-testid="traffic-confirmation-msg"]';
    
    // UDR Table Locators
    this.udrTableSection = '[data-testid="udr-lt-01-table-section"]';
    this.udrConsumptionCell = '[data-testid="udr-consumption-value"]';
    this.udrApn2Entry = '[data-testid="udr-apn2-entry"]';
    
    // Billing Details Locators
    this.billingDetailsSection = '[data-testid="billing-details-section"]';
    this.inPoolCalculationSection = '[data-testid="in-pool-calculation"]';
    this.inPoolExcludedTrafficList = '[data-testid="in-pool-excluded-traffic"]';
    this.bulkRateIndicator = '[data-testid="bulk-rate-indicator"]';
    this.apn2ChargeAmount = '[data-testid="apn2-charge-amount"]';
    this.bulkRatePerMb = '[data-testid="bulk-rate-per-mb"]';
    
    // Invoice Locators
    this.invoiceSection = '[data-testid="invoice-section"]';
    this.additionalServicesSection = '[data-testid="additional-services-section"]';
    this.additionalServicesExpandBtn = '[data-testid="additional-services-expand-btn"]';
    this.additionalServicesApn2Entry = '[data-testid="additional-services-apn2-entry"]';
    this.additionalServicesPlanField = '[data-testid="additional-services-plan-field"]';
    this.trafficDetailSection = '[data-testid="traffic-detail-sold-section"]';
    this.trafficDetailExpandBtn = '[data-testid="traffic-detail-expand-btn"]';
    this.trafficDetailApn2Entry = '[data-testid="traffic-detail-apn2-entry"]';
    this.trafficDetailPlanField = '[data-testid="traffic-detail-plan-field"]';
  }

  async navigateToLineProvisioning() {
    await this.page.locator(this.lineProvisioningSection).waitFor({ state: 'visible' });
    await this.page.locator(this.lineProvisioningSection).click();
  }

  async selectSoldPlan() {
    await this.page.locator(this.soldPlanOption).click();
  }

  async configureApn2ForInternetAndFota() {
    await this.page.locator(this.apn2ConfigCheckbox).check();
    await this.page.locator(this.internetNavigationOption).check();
    await this.page.locator(this.fotaOption).check();
  }

  async provisionLine() {
    await this.page.locator(this.provisionLineButton).click();
  }

  async verifyLineProvisionedWithApn2() {
    await this.page.locator(this.provisioningSuccessMessage).waitFor({ state: 'visible' });
    return await this.page.locator(this.provisioningSuccessMessage).isVisible();
  }

  async verifyUserAuthenticated() {
    const isAuthenticated = await this.page.locator(this.userAuthenticatedIndicator).isVisible();
    expect(isAuthenticated).toBeTruthy();
  }

  async navigateToTrafficSimulator() {
    await this.page.locator(this.trafficSimulatorSection).click();
  }

  async generateApn2Traffic(megabytes) {
    await this.page.locator(this.apn2TrafficInput).fill(megabytes.toString());
    await this.page.locator(this.generateTrafficButton).click();
  }

  async confirmTrafficGeneration() {
    await this.page.locator(this.trafficConfirmationMessage).waitFor({ state: 'visible' });
  }

  async navigateToUdrTable() {
    await this.page.locator(this.udrTableSection).click();
  }

  async verifyConsumptionInUdrTable(expectedMb) {
    await this.page.locator(this.udrApn2Entry).waitFor({ state: 'visible' });
    const consumptionText = await this.page.locator(this.udrConsumptionCell).textContent();
    return consumptionText.includes(expectedMb.toString());
  }

  async navigateToBillingDetails() {
    await this.page.locator(this.billingDetailsSection).click();
  }

  async verifyTrafficExcludedFromInPool() {
    await this.page.locator(this.inPoolExcludedTrafficList).waitFor({ state: 'visible' });
    const excludedTrafficText = await this.page.locator(this.inPoolExcludedTrafficList).textContent();
    return excludedTrafficText.includes('APN2');
  }

  async verifyBulkRateApplied() {
    return await this.page.locator(this.bulkRateIndicator).isVisible();
  }

  async getApn2ChargeAmount() {
    const chargeText = await this.page.locator(this.apn2ChargeAmount).textContent();
    return chargeText.replace(/[^0-9.]/g, '');
  }

  async getBulkRatePerMb() {
    const rateText = await this.page.locator(this.bulkRatePerMb).textContent();
    return rateText.replace(/[^0-9.]/g, '');
  }

  async navigateToInvoice() {
    await this.page.locator(this.invoiceSection).click();
  }

  async expandAdditionalServicesSection() {
    await this.page.locator(this.additionalServicesExpandBtn).click();
    await this.page.locator(this.additionalServicesSection).waitFor({ state: 'visible' });
  }

  async verifyApn2InAdditionalServices() {
    return await this.page.locator(this.additionalServicesApn2Entry).isVisible();
  }

  async getPlanFieldInAdditionalServices() {
    return await this.page.locator(this.additionalServicesPlanField).textContent();
  }

  async expandTrafficDetailSection() {
    await this.page.locator(this.trafficDetailExpandBtn).click();
    await this.page.locator(this.trafficDetailSection).waitFor({ state: 'visible' });
  }

  async verifyApn2InTrafficDetail() {
    return await this.page.locator(this.trafficDetailApn2Entry).isVisible();
  }

  async getPlanFieldInTrafficDetail() {
    return await this.page.locator(this.trafficDetailPlanField).textContent();
  }
}

module.exports = SoldPlanPage;