const { expect } = require('@playwright/test');

class MigrationPage {
  constructor(page) {
    this.page = page;
    
    this.homologationTable = page.locator('[data-testid="homologation-table"]');
    this.planMappingSection = page.locator('[data-testid="plan-mapping-section"]');
    this.currentPlansList = page.locator('[data-testid="current-plans-list"]');
    this.newPlansList = page.locator('[data-testid="new-plans-list"]');
    this.migrationButton = page.locator('[data-testid="execute-migration-btn"]');
    this.migrationStatus = page.locator('[data-testid="migration-status"]');
    this.planStatusIndicator = page.locator('[data-testid="plan-status"]');
    this.includedUnitsSection = page.locator('[data-testid="included-units-section"]');
    this.voiceIncluded = page.locator('[data-testid="voice-included"]');
    this.smsIncluded = page.locator('[data-testid="sms-included"]');
    this.dataIncluded = page.locator('[data-testid="data-included"]');
    this.inPoolConfig = page.locator('[data-testid="in-pool-configuration"]');
    this.inPoolSize = page.locator('[data-testid="in-pool-size"]');
    this.inPoolApns = page.locator('[data-testid="in-pool-apns"]');
    this.billingModelDisplay = page.locator('[data-testid="billing-model"]');
    this.databaseTablesSection = page.locator('[data-testid="database-tables-section"]');
    this.historicalQuerySection = page.locator('[data-testid="historical-query-section"]');
  }

  async navigateToHomologationTable() {
    await this.page.locator('[data-testid="nav-homologation"]').click();
    await this.homologationTable.waitFor({ state: 'visible' });
  }

  async isHomologationTableVisible() {
    return await this.homologationTable.isVisible();
  }

  async verifyCurrentPlansActive(plans) {
    for (const plan of plans) {
      const planRow = this.page.locator(`[data-testid="plan-row-${plan}"]`);
      const status = await planRow.locator('[data-testid="plan-status-badge"]').textContent();
      if (status !== 'active') return false;
    }
    return true;
  }

  async selectPlanMapping(sourcePlan, targetPlan) {
    await this.page.locator(`[data-testid="source-plan-${sourcePlan}"]`).click();
    await this.page.locator(`[data-testid="target-plan-${targetPlan}"]`).click();
    await this.page.locator('[data-testid="view-mapping-details"]').click();
  }

  async verifyPlanCompatibility(sourcePlan, targetPlan) {
    const compatibilityIndicator = this.page.locator(`[data-testid="compatibility-${sourcePlan}-${targetPlan}"]`);
    const status = await compatibilityIndicator.getAttribute('data-compatible');
    return status === 'true';
  }

  async verifyBulkBillingPreserved(plan) {
    const billingConfig = this.page.locator(`[data-testid="billing-config-${plan}"]`);
    const billingType = await billingConfig.getAttribute('data-billing-type');
    const includedUnits = await billingConfig.getAttribute('data-included-units');
    return billingType === 'bulk' && includedUnits === 'none';
  }

  async getIncludedUnits(plan) {
    await this.page.locator(`[data-testid="plan-details-${plan}"]`).click();
    const voice = await this.voiceIncluded.textContent();
    const sms = await this.smsIncluded.textContent();
    const data = await this.dataIncluded.textContent();
    return { voice: voice.trim(), sms: sms.trim(), data: data.trim() };
  }

  async verifyBillingUnchanged(sourcePlan, targetPlan) {
    const sourceBilling = await this.page.locator(`[data-testid="billing-amount-${sourcePlan}"]`).textContent();
    const targetBilling = await this.page.locator(`[data-testid="billing-amount-${targetPlan}"]`).textContent();
    return sourceBilling === targetBilling;
  }

  async verifyBenefitsPreserved(sourcePlan, targetPlan) {
    const sourceBenefits = await this.page.locator(`[data-testid="benefits-${sourcePlan}"]`).textContent();
    const targetBenefits = await this.page.locator(`[data-testid="benefits-${targetPlan}"]`).textContent();
    return sourceBenefits === targetBenefits;
  }

  async getInPoolConfiguration(plan) {
    await this.page.locator(`[data-testid="plan-details-${plan}"]`).click();
    await this.inPoolConfig.waitFor({ state: 'visible' });
    const size = await this.inPoolSize.textContent();
    const apnsText = await this.inPoolApns.textContent();
    const apns = apnsText.split(',').map(apn => apn.trim());
    return { size: size.trim(), apns };
  }

  async getBillingModel(plan) {
    await this.page.locator(`[data-testid="plan-details-${plan}"]`).click();
    return await this.billingModelDisplay.textContent();
  }

  async executeMigration() {
    await this.migrationButton.click();
    await this.page.locator('[data-testid="confirm-migration-dialog"]').waitFor({ state: 'visible' });
    await this.page.locator('[data-testid="confirm-migration-btn"]').click();
  }

  async waitForMigrationComplete() {
    await this.migrationStatus.waitFor({ state: 'visible' });
    await this.page.waitForFunction(
      () => document.querySelector('[data-testid="migration-status"]')?.textContent?.includes('complete'),
      { timeout: 60000 }
    );
  }

  async getPlanStatus(plan) {
    const planRow = this.page.locator(`[data-testid="plan-row-${plan}"]`);
    return await planRow.locator('[data-testid="plan-status-badge"]').textContent();
  }

  async verifyHistoricalAccessAvailable(plans) {
    await this.page.locator('[data-testid="nav-historical-queries"]').click();
    await this.historicalQuerySection.waitFor({ state: 'visible' });
    for (const plan of plans) {
      const planOption = this.page.locator(`[data-testid="historical-plan-${plan}"]`);
      if (!(await planOption.isVisible())) return false;
    }
    return true;
  }

  async verifyTableUpdated(tableName) {
    await this.page.locator('[data-testid="nav-database-tables"]').click();
    await this.databaseTablesSection.waitFor({ state: 'visible' });
    const tableRow = this.page.locator(`[data-testid="table-row-${tableName}"]`);
    const lastUpdated = await tableRow.locator('[data-testid="last-updated"]').textContent();
    const today = new Date().toISOString().split('T')[0];
    return lastUpdated.includes(today);
  }

  async verifyHistoricalReferences(plans) {
    for (const plan of plans) {
      const planRow = this.page.locator(`[data-testid="plan-row-${plan}"]`);
      const historicalFlag = await planRow.locator('[data-testid="historical-flag"]').getAttribute('data-value');
      if (historicalFlag !== 'true') return false;
    }
    return true;
  }
}

module.exports = MigrationPage;