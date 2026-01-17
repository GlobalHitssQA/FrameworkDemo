const { expect } = require('@playwright/test');

class BSCS7Page {
  constructor(page) {
    this.page = page;
    
    // Navigation and authentication locators
    this.#userPermissionsIndicator = '[data-testid="user-permissions-badge"]';
    this.#lineCreationPermission = '[data-testid="permission-line-creation"]';
    
    // Plan configuration locators
    this.#planConfigurationSection = '[data-testid="plan-configuration-section"]';
    this.#manufacturePlanRow = '[data-testid="plan-row-manufacture"]';
    this.#voLTEConfigStatus = '[data-testid="volte-config-status"]';
    
    // Connectivity locators
    this.#instantLinkStatus = '[data-testid="instant-link-status"]';
    this.#redConnectivityIndicator = '[data-testid="red-connectivity-indicator"]';
    
    // APN configuration locators
    this.#apnConfigurationTable = '[data-testid="apn-configuration-table"]';
    this.#apnRowPrefix = '[data-testid="apn-row-"]';
    
    // Line creation locators
    this.#newLineButton = '[data-testid="btn-new-line"]';
    this.#planSelector = '[data-testid="select-plan"]';
    this.#manufacturePlanOption = '[data-testid="option-manufacture-plan"]';
    this.#confirmCreationButton = '[data-testid="btn-confirm-creation"]';
    
    // Line details locators
    this.#linePlanName = '[data-testid="line-plan-name"]';
    this.#voiceInclusion = '[data-testid="inclusion-voice"]';
    this.#smsInclusion = '[data-testid="inclusion-sms"]';
    this.#dataInclusion = '[data-testid="inclusion-data"]';
    
    // VoLTE service locators
    this.#voLTEServiceStatus = '[data-testid="volte-service-status"]';
    
    // Provision log locators
    this.#provisionLogSection = '[data-testid="provision-log-section"]';
    this.#instantLinkLogContent = '[data-testid="instant-link-log-content"]';
    
    // Network elements locators
    this.#networkElementsSection = '[data-testid="network-elements-section"]';
    this.#hlrStatusRow = '[data-testid="network-element-hlr"]';
    this.#hssStatusRow = '[data-testid="network-element-hss"]';
    this.#imsStatusRow = '[data-testid="network-element-ims"]';
    this.#elementVoLTEStatus = '[data-testid="element-volte-status"]';
    
    // APN status locators
    this.#apnStatusSection = '[data-testid="apn-status-section"]';
    this.#apnActiveIndicator = '[data-testid="apn-active-indicator"]';
    this.#apnVoLTEStatus = '[data-testid="apn-volte-status"]';
  }

  async navigateToBSCS7() {
    await this.page.goto(process.env.BSCS7_URL || 'https://bscs7.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasLineCreationPermissions() {
    await this.page.waitForSelector(this.#userPermissionsIndicator);
    const hasPermission = await this.page.locator(this.#lineCreationPermission).isVisible();
    expect(hasPermission).toBe(true);
  }

  async verifyManufacturePlanVoLTEConfiguration() {
    await this.page.click(this.#planConfigurationSection);
    await this.page.waitForSelector(this.#manufacturePlanRow);
    const voLTEConfig = await this.page.locator(this.#manufacturePlanRow).locator(this.#voLTEConfigStatus).textContent();
    expect(voLTEConfig.toLowerCase()).toContain('enabled');
  }

  async verifyInstantLinkConnectivity() {
    const instantLinkStatus = await this.page.locator(this.#instantLinkStatus).textContent();
    const redConnectivity = await this.page.locator(this.#redConnectivityIndicator).textContent();
    expect(instantLinkStatus.toLowerCase()).toContain('connected');
    expect(redConnectivity.toLowerCase()).toContain('available');
  }

  async verifyProductiveAPNsConfiguration() {
    await this.page.waitForSelector(this.#apnConfigurationTable);
    const apnRows = await this.page.locator(this.#apnConfigurationTable + ' tr').count();
    expect(apnRows).toBeGreaterThanOrEqual(7);
  }

  async clickNewLineButton() {
    await this.page.click(this.#newLineButton);
    await this.page.waitForSelector(this.#planSelector);
  }

  async selectManufacturePlan() {
    await this.page.click(this.#planSelector);
    await this.page.click(this.#manufacturePlanOption);
  }

  async confirmLineCreation() {
    await this.page.click(this.#confirmCreationButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getLinePlanName() {
    return await this.page.locator(this.#linePlanName).textContent();
  }

  async getLineInclusions() {
    const voice = await this.page.locator(this.#voiceInclusion).textContent();
    const sms = await this.page.locator(this.#smsInclusion).textContent();
    const data = await this.page.locator(this.#dataInclusion).textContent();
    return { voice: voice.trim(), sms: sms.trim(), data: data.trim() };
  }

  async getVoLTEServiceStatus() {
    return await this.page.locator(this.#voLTEServiceStatus).textContent();
  }

  async getInstantLinkProvisionLog() {
    await this.page.click(this.#provisionLogSection);
    await this.page.waitForSelector(this.#instantLinkLogContent);
    return await this.page.locator(this.#instantLinkLogContent).textContent();
  }

  async getNetworkElementStatus(elementName) {
    await this.page.waitForSelector(this.#networkElementsSection);
    let elementRow;
    switch (elementName.toUpperCase()) {
      case 'HLR':
        elementRow = this.#hlrStatusRow;
        break;
      case 'HSS':
        elementRow = this.#hssStatusRow;
        break;
      case 'IMS':
        elementRow = this.#imsStatusRow;
        break;
      default:
        throw new Error(`Unknown network element: ${elementName}`);
    }
    const voLTEStatus = await this.page.locator(elementRow).locator(this.#elementVoLTEStatus).textContent();
    return { voLTE: voLTEStatus.trim() };
  }

  async getAPNStatus(apnName) {
    await this.page.waitForSelector(this.#apnStatusSection);
    const apnRow = `[data-testid="apn-row-${apnName.toLowerCase()}"]`;
    const isActive = await this.page.locator(apnRow).locator(this.#apnActiveIndicator).textContent();
    const voLTEStatus = await this.page.locator(apnRow).locator(this.#apnVoLTEStatus).textContent();
    return {
      active: isActive.toLowerCase().includes('active') || isActive.toLowerCase().includes('true'),
      voLTE: voLTEStatus.trim()
    };
  }
}

module.exports = BSCS7Page;