class BSCS7Page {
  constructor(page) {
    this.page = page;
    this.lineProvisioningMenu = '[data-testid="menu-line-provisioning"]';
    this.planSelector = '[data-testid="select-rateplan"]';
    this.volteServiceCheckbox = '[data-testid="checkbox-volte-service"]';
    this.volteStatusIndicator = '[data-testid="indicator-volte-status"]';
    this.instantLinkPanel = '[data-testid="panel-instant-link"]';
    this.parameterServiceVolte = '[data-testid="param-service-volte"]';
    this.simStatusField = '[data-testid="field-sim-status"]';
    this.activeServicesContainer = '[data-testid="container-active-services"]';
    this.changePlanButton = '[data-testid="btn-change-plan"]';
    this.confirmPlanChangeButton = '[data-testid="btn-confirm-plan-change"]';
    this.provisionLineButton = '[data-testid="btn-provision-line"]';
    this.saveConfigButton = '[data-testid="btn-save-config"]';
    this.planOptionTemplate = '[data-testid="option-plan-{planName}"]';
  }

  async navigateToLineProvisioning() {
    await this.page.click(this.lineProvisioningMenu);
    await this.page.waitForSelector(this.planSelector);
  }

  async provisionLineWithPlan(planName) {
    await this.page.click(this.planSelector);
    const planOption = this.planOptionTemplate.replace('{planName}', planName.toLowerCase().replace(/\s+/g, '-'));
    await this.page.click(planOption);
    await this.page.click(this.provisionLineButton);
    await this.page.waitForLoadState('networkidle');
  }

  async enableVoLTEService() {
    const isChecked = await this.page.isChecked(this.volteServiceCheckbox);
    if (!isChecked) {
      await this.page.click(this.volteServiceCheckbox);
    }
    await this.page.click(this.saveConfigButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isVoLTEServiceEnabled() {
    await this.page.waitForSelector(this.volteStatusIndicator);
    const statusText = await this.page.textContent(this.volteStatusIndicator);
    return statusText.toLowerCase().includes('enabled') || statusText.toLowerCase().includes('activo');
  }

  async verifyInstantLinkParameter(parameterName) {
    await this.page.click(this.instantLinkPanel);
    await this.page.waitForSelector(this.parameterServiceVolte);
    const parameterValue = await this.page.textContent(this.parameterServiceVolte);
    return parameterValue !== null && parameterValue.length > 0;
  }

  async changePlanTo(planName) {
    await this.page.click(this.changePlanButton);
    await this.page.waitForSelector(this.planSelector);
    await this.page.click(this.planSelector);
    const planOption = this.planOptionTemplate.replace('{planName}', planName.toLowerCase().replace(/\s+/g, '-'));
    await this.page.click(planOption);
    await this.page.click(this.confirmPlanChangeButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getSIMStatus() {
    await this.page.waitForSelector(this.simStatusField);
    const statusText = await this.page.textContent(this.simStatusField);
    return statusText.toUpperCase().trim();
  }

  async hasActiveServices() {
    await this.page.waitForSelector(this.activeServicesContainer);
    const servicesCount = await this.page.locator(this.activeServicesContainer + ' > *').count();
    return servicesCount > 0;
  }
}

module.exports = BSCS7Page;