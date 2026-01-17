const { expect } = require('@playwright/test');

class SoldPlanTrafficPage {
  constructor(page) {
    this.page = page;
    
    this.provisioningSystemUrl = '/provisioning';
    this.trafficSimulatorUrl = '/traffic-simulator';
    this.udrConsoleUrl = '/udr-console';
    this.billingSystemUrl = '/billing';
    this.invoicePreviewUrl = '/invoice-preview';
    this.packageManagementUrl = '/package-management';
    
    this.planSelector = this.page.locator('[data-testid="plan-selector"]');
    this.soldPlanOption = this.page.locator('[data-testid="plan-option-sold"]');
    this.apnConfigSection = this.page.locator('[data-testid="apn-configuration"]');
    this.apn6Checkbox = this.page.locator('[data-testid="apn6-wifi-checkbox"]');
    this.provisionButton = this.page.locator('[data-testid="btn-provision-line"]');
    this.provisioningStatus = this.page.locator('[data-testid="provisioning-status"]');
    this.apn6ActiveIndicator = this.page.locator('[data-testid="apn6-active-indicator"]');
    
    this.trafficAmountInput = this.page.locator('[data-testid="traffic-amount-mb"]');
    this.apnTypeSelector = this.page.locator('[data-testid="apn-type-selector"]');
    this.apn6Option = this.page.locator('[data-testid="apn-option-apn6"]');
    this.generateTrafficButton = this.page.locator('[data-testid="btn-generate-traffic"]');
    this.trafficGenerationStatus = this.page.locator('[data-testid="traffic-generation-status"]');
    
    this.udrTableSelector = this.page.locator('[data-testid="udr-table-selector"]');
    this.udrLt01Option = this.page.locator('[data-testid="udr-table-lt01"]');
    this.udrSearchButton = this.page.locator('[data-testid="btn-udr-search"]');
    this.udrTrafficRecord = this.page.locator('[data-testid="udr-traffic-record"]');
    
    this.inPoolCalculationSection = this.page.locator('[data-testid="in-pool-calculation"]');
    this.apn6ExclusionIndicator = this.page.locator('[data-testid="apn6-excluded-from-pool"]');
    this.chargeTypeField = this.page.locator('[data-testid="apn6-charge-type"]');
    this.totalChargeField = this.page.locator('[data-testid="apn6-total-charge"]');
    this.ratePerMbField = this.page.locator('[data-testid="apn6-rate-per-mb"]');
    
    this.additionalServicesSection = this.page.locator('[data-testid="section-additional-services"]');
    this.trafficDetailSection = this.page.locator('[data-testid="section-traffic-detail"]');
    this.apn6ServiceRow = this.page.locator('[data-testid="apn6-service-row"]');
    this.apn6TrafficDetailRow = this.page.locator('[data-testid="apn6-traffic-detail-row"]');
    this.planFieldValue = this.page.locator('[data-testid="plan-field-value"]');
    
    this.packageListSection = this.page.locator('[data-testid="package-list"]');
    this.trial6GbPackage = this.page.locator('[data-testid="package-trial-6gb"]');
    this.b2b2cPackage = this.page.locator('[data-testid="package-b2b2c"]');
    this.activatePackageButton = this.page.locator('[data-testid="btn-activate-package"]');
    this.packageStatusIndicator = this.page.locator('[data-testid="package-status"]');
    this.conflictWarning = this.page.locator('[data-testid="conflict-warning"]');
  }

  async navigateToProvisioningSystem() {
    await this.page.goto(this.provisioningSystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async provisionLineWithSoldPlan() {
    await this.planSelector.click();
    await this.soldPlanOption.click();
    await this.provisionButton.click();
    await this.provisioningStatus.waitFor({ state: 'visible' });
  }

  async configureApn6ForWifiTraffic() {
    await this.apnConfigSection.click();
    await this.apn6Checkbox.check();
  }

  async verifyLineProvisionedWithApn6() {
    const statusText = await this.provisioningStatus.textContent();
    const isApn6Active = await this.apn6ActiveIndicator.isVisible();
    return statusText.includes('PROVISIONED') && isApn6Active;
  }

  async navigateToTrafficSimulator() {
    await this.page.goto(this.trafficSimulatorUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async generateApn6Traffic(amountMb) {
    await this.trafficAmountInput.fill(amountMb);
    await this.apnTypeSelector.click();
    await this.apn6Option.click();
    await this.generateTrafficButton.click();
  }

  async waitForTrafficRegistration() {
    await this.trafficGenerationStatus.waitFor({ state: 'visible' });
    await expect(this.trafficGenerationStatus).toContainText('COMPLETED');
  }

  async navigateToUdrConsole() {
    await this.page.goto(this.udrConsoleUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async getUdrLt01TrafficRecord() {
    await this.udrTableSelector.click();
    await this.udrLt01Option.click();
    await this.udrSearchButton.click();
    await this.udrTrafficRecord.waitFor({ state: 'visible' });
    return await this.udrTrafficRecord.textContent();
  }

  async navigateToBillingSystem() {
    await this.page.goto(this.billingSystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTrafficExcludedFromInPool() {
    await this.inPoolCalculationSection.click();
    return await this.apn6ExclusionIndicator.isVisible();
  }

  async getApn6ChargeType() {
    return await this.chargeTypeField.textContent();
  }

  async getApn6TotalCharge() {
    const chargeText = await this.totalChargeField.textContent();
    return chargeText.replace(/[^0-9.]/g, '');
  }

  async getApn6RatePerMb() {
    const rateText = await this.ratePerMbField.textContent();
    return rateText.replace(/[^0-9.]/g, '');
  }

  async navigateToInvoicePreview() {
    await this.page.goto(this.invoicePreviewUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyApn6InAdditionalServicesSection() {
    await this.additionalServicesSection.click();
    return await this.apn6ServiceRow.isVisible();
  }

  async verifyApn6InTrafficDetailSection() {
    await this.trafficDetailSection.click();
    return await this.apn6TrafficDetailRow.isVisible();
  }

  async getPlanFieldValue() {
    return await this.planFieldValue.textContent();
  }

  async navigateToPackageManagement() {
    await this.page.goto(this.packageManagementUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async activateTrial6GbPackage() {
    await this.trial6GbPackage.click();
    await this.activatePackageButton.click();
    await this.packageStatusIndicator.waitFor({ state: 'visible' });
  }

  async activateB2b2cPackage() {
    await this.b2b2cPackage.click();
    await this.activatePackageButton.click();
    await this.packageStatusIndicator.waitFor({ state: 'visible' });
  }

  async verifyPackageActivation(packageType) {
    const selector = packageType === 'TRIAL_6GB' ? this.trial6GbPackage : this.b2b2cPackage;
    const statusText = await selector.locator('[data-testid="package-status"]').textContent();
    return statusText.includes('ACTIVE');
  }

  async checkPackageConflictWithBulkTraffic() {
    return await this.conflictWarning.isVisible();
  }
}

module.exports = SoldPlanTrafficPage;