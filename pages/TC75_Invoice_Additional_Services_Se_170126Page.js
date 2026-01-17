const { expect } = require('@playwright/test');

class InvoiceAdditionalServicesPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = page.locator('[data-testid="login-username"]');
    this.loginPasswordInput = page.locator('[data-testid="login-password"]');
    this.loginSubmitButton = page.locator('[data-testid="login-submit"]');
    
    this.invoiceSearchInput = page.locator('[data-testid="invoice-search-input"]');
    this.invoiceSearchButton = page.locator('[data-testid="invoice-search-button"]');
    this.generalMotorsInvoiceRow = page.locator('[data-testid="invoice-row-general-motors"]');
    
    this.additionalServicesSection = page.locator('[data-testid="section-additional-services"]');
    this.additionalServicesSectionHeader = page.locator('[data-testid="header-additional-services"]');
    
    this.dataTrafficDetail = page.locator('[data-testid="traffic-detail-data"]');
    this.voiceTrafficDetail = page.locator('[data-testid="traffic-detail-voice"]');
    this.smsTrafficDetail = page.locator('[data-testid="traffic-detail-sms"]');
    
    this.trafficPlanRows = page.locator('[data-testid="traffic-plan-row"]');
    this.trafficPlanNameCell = page.locator('[data-testid="traffic-plan-name"]');
    
    this.soldPlanApnRows = page.locator('[data-testid="sold-plan-apn-row"]');
    this.apnNameCell = page.locator('[data-testid="apn-name"]');
    
    this.inPoolServicesSection = page.locator('[data-testid="section-in-pool-services"]');
    this.inPoolGranelSection = page.locator('[data-testid="section-in-pool-granel"]');
    
    this.activeLinesIndicator = page.locator('[data-testid="active-sold-lines-indicator"]');
    this.invoiceStatusIndicator = page.locator('[data-testid="invoice-status"]');
    this.shellExecutionStatus = page.locator('[data-testid="shell-execution-status"]');
  }

  async navigateToLoginPage() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    await this.loginUsernameInput.fill(process.env.BSCS7_USERNAME || 'testuser');
    await this.loginPasswordInput.fill(process.env.BSCS7_PASSWORD || 'testpass');
    await this.loginSubmitButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyActiveSoldLinesExist() {
    await this.activeLinesIndicator.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.activeLinesIndicator.textContent();
    return text && text.includes('SOLD');
  }

  async verifyInvoiceGenerated() {
    await this.invoiceStatusIndicator.waitFor({ state: 'visible', timeout: 10000 });
    const status = await this.invoiceStatusIndicator.textContent();
    return status && status.toLowerCase().includes('generated');
  }

  async verifyInPoolShellExecution() {
    await this.shellExecutionStatus.waitFor({ state: 'visible', timeout: 10000 });
    const status = await this.shellExecutionStatus.textContent();
    return status && status.toLowerCase().includes('success');
  }

  async navigateToGeneralMotorsInvoice() {
    await this.invoiceSearchInput.fill('General Motors');
    await this.invoiceSearchButton.click();
    await this.generalMotorsInvoiceRow.waitFor({ state: 'visible', timeout: 10000 });
    await this.generalMotorsInvoiceRow.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openAdditionalServicesSection() {
    await this.additionalServicesSectionHeader.click();
    await this.additionalServicesSection.waitFor({ state: 'visible', timeout: 10000 });
  }

  async isAdditionalServicesSectionVisible() {
    return await this.additionalServicesSection.isVisible();
  }

  async isDataTrafficDetailVisible() {
    return await this.dataTrafficDetail.isVisible();
  }

  async isVoiceTrafficDetailVisible() {
    return await this.voiceTrafficDetail.isVisible();
  }

  async isSmsTrafficDetailVisible() {
    return await this.smsTrafficDetail.isVisible();
  }

  async getDisplayedDataTrafficPlans() {
    const plans = [];
    const rows = await this.trafficPlanRows.all();
    
    for (const row of rows) {
      const planName = await row.locator('[data-testid="traffic-plan-name"]').textContent();
      if (planName) {
        plans.push(planName.trim());
      }
    }
    
    return plans;
  }

  async getSoldPlanApnTraffic() {
    const apns = [];
    const rows = await this.soldPlanApnRows.all();
    
    for (const row of rows) {
      const apnName = await row.locator('[data-testid="apn-name"]').textContent();
      if (apnName) {
        apns.push(apnName.trim());
      }
    }
    
    return apns;
  }

  async isTelemetryApnVisibleForSold(apnName) {
    const soldTelemetryApn = this.page.locator(
      `[data-testid="sold-plan-apn-row"]:has([data-testid="apn-name"]:text-is("${apnName}"))`
    );
    return await soldTelemetryApn.isVisible();
  }

  async checkInPoolTrafficDuplication() {
    const additionalServicesTraffic = await this.getAdditionalServicesInPoolTraffic();
    const inPoolSectionTraffic = await this.getInPoolSectionTraffic();
    
    for (const item of additionalServicesTraffic) {
      if (inPoolSectionTraffic.includes(item)) {
        return true;
      }
    }
    
    return false;
  }

  async getAdditionalServicesInPoolTraffic() {
    const traffic = [];
    const telemetryRows = await this.page.locator(
      '[data-testid="section-additional-services"] [data-testid="telemetry-traffic-row"]'
    ).all();
    
    for (const row of telemetryRows) {
      const lineId = await row.locator('[data-testid="line-id"]').textContent();
      if (lineId) {
        traffic.push(lineId.trim());
      }
    }
    
    return traffic;
  }

  async getInPoolSectionTraffic() {
    const traffic = [];
    const inPoolRows = await this.page.locator(
      '[data-testid="section-in-pool-services"] [data-testid="in-pool-traffic-row"], [data-testid="section-in-pool-granel"] [data-testid="in-pool-traffic-row"]'
    ).all();
    
    for (const row of inPoolRows) {
      const lineId = await row.locator('[data-testid="line-id"]').textContent();
      if (lineId) {
        traffic.push(lineId.trim());
      }
    }
    
    return traffic;
  }
}

module.exports = InvoiceAdditionalServicesPage;