class TrafficDetailSOLDPage {
  constructor(page) {
    this.page = page;
    this.billingSystemUrl = '/billing';
    
    this.invoiceContainer = '[data-testid="invoice-container"]';
    this.gmInvoiceLink = '[data-testid="gm-consolidated-invoice"]';
    this.invoiceSectionsWrapper = '[data-testid="invoice-sections"]';
    this.trafficDetailSOLDSection = '[data-testid="traffic-detail-sold-section"]';
    this.trafficDetailSOLDLink = '[data-testid="nav-traffic-detail-sold"]';
    this.apnTableRows = '[data-testid="traffic-detail-sold-section"] [data-testid="apn-row"]';
    this.apnNameCell = '[data-testid="apn-name"]';
    this.apnTechnicalNameCell = '[data-testid="apn-technical-name"]';
    this.apnVolumeCell = '[data-testid="apn-volume-mb"]';
    this.sectionTitle = '[data-testid="traffic-detail-sold-title"]';
  }

  async navigateToBillingSystem() {
    await this.page.goto(this.billingSystemUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async openGeneralMotorsInvoice() {
    await this.page.click(this.gmInvoiceLink);
    await this.page.waitForSelector(this.invoiceContainer);
  }

  async isInvoiceFullyLoaded() {
    return await this.page.isVisible(this.invoiceSectionsWrapper);
  }

  async navigateToTrafficDetailSOLDSection() {
    await this.page.click(this.trafficDetailSOLDLink);
    await this.page.waitForSelector(this.trafficDetailSOLDSection);
  }

  async isTrafficDetailSOLDSectionVisible() {
    return await this.page.isVisible(this.trafficDetailSOLDSection);
  }

  async getDisplayedAPNs() {
    const apnNames = await this.page.$$eval(this.apnNameCell, elements => 
      elements.map(el => el.textContent.trim())
    );
    const technicalNames = await this.page.$$eval(this.apnTechnicalNameCell, elements => 
      elements.map(el => el.textContent.trim())
    );
    return [...apnNames, ...technicalNames];
  }

  async getAPNVolume(apnIdentifier) {
    const rows = await this.page.$$(this.apnTableRows);
    for (const row of rows) {
      const nameCell = await row.$(this.apnNameCell.replace('[data-testid="traffic-detail-sold-section"] ', ''));
      const name = await nameCell.textContent();
      if (name.includes(apnIdentifier)) {
        const volumeCell = await row.$(this.apnVolumeCell.replace('[data-testid="traffic-detail-sold-section"] ', ''));
        return await volumeCell.textContent();
      }
    }
    return null;
  }

  async isAPNPresent(apnIdentifier) {
    const apns = await this.getDisplayedAPNs();
    return apns.some(apn => apn.includes(apnIdentifier));
  }
}

module.exports = TrafficDetailSOLDPage;