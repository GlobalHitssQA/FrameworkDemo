class ContractValuePage {
  constructor(page) {
    this.page = page;
    
    // Locators - inferidos basados en mejores prácticas
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueContainer = '[data-testid="total-value-container"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownTrigger = '[data-testid="breakdown-trigger"]';
    this.breakdownItems = '[data-testid="breakdown-item"]';
    this.breakdownList = '[data-testid="breakdown-list"]';
    this.purchasingPowerMXN = '[data-testid="purchasing-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.pendingSettlements = '[data-testid="pending-settlements"]';
    this.searchButton = '[data-testid="search-client-contract"]';
  }

  async navigateToContractView() {
    await this.page.goto('/contratos');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForAuthentication() {
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async openBreakdownPopup() {
    await this.page.click(this.breakdownTrigger);
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async captureComponentStyles() {
    await this.page.waitForSelector(this.totalValueContainer);
  }

  async getTotalValueContainerPadding() {
    const padding = await this.page.$eval(this.totalValueContainer, (el) => {
      const styles = window.getComputedStyle(el);
      return {
        top: styles.paddingTop,
        right: styles.paddingRight,
        bottom: styles.paddingBottom,
        left: styles.paddingLeft
      };
    });
    return padding;
  }

  async getBreakdownItemsMargins() {
    const margins = await this.page.$$eval(this.breakdownItems, (elements) => {
      return elements.map((el) => {
        const styles = window.getComputedStyle(el);
        return styles.marginBottom;
      });
    });
    return margins;
  }

  async verifyVerticalAlignment() {
    const alignment = await this.page.evaluate((selectors) => {
      const totalValue = document.querySelector(selectors.totalValueContainer);
      const breakdownList = document.querySelector(selectors.breakdownList);
      
      if (!totalValue || !breakdownList) return false;
      
      const totalValueRect = totalValue.getBoundingClientRect();
      const breakdownRect = breakdownList.getBoundingClientRect();
      
      const tolerance = 2;
      return Math.abs(totalValueRect.left - breakdownRect.left) <= tolerance;
    }, {
      totalValueContainer: this.totalValueContainer,
      breakdownList: this.breakdownList
    });
    return alignment;
  }

  async verifyDesignSystemCompliance() {
    const compliance = await this.page.evaluate((selectors) => {
      const allowedSpacings = ['4px', '8px', '12px', '16px', '24px', '32px', '48px'];
      const component = document.querySelector(selectors.contractValueComponent);
      
      if (!component) return { isCompliant: false, errors: ['Component not found'] };
      
      const styles = window.getComputedStyle(component);
      const spacingProps = ['padding', 'margin', 'gap'];
      const errors = [];
      
      const checkSpacing = (value) => {
        if (value === '0px' || value === 'auto') return true;
        return allowedSpacings.includes(value);
      };
      
      ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
       'marginTop', 'marginRight', 'marginBottom', 'marginLeft'].forEach((prop) => {
        if (!checkSpacing(styles[prop])) {
          errors.push(`${prop}: ${styles[prop]} is not in design system`);
        }
      });
      
      return {
        isCompliant: errors.length === 0,
        errors: errors
      };
    }, {
      contractValueComponent: this.contractValueComponent
    });
    return compliance;
  }

  async closeBreakdownPopup() {
    await this.page.click('body', { position: { x: 0, y: 0 } });
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden' });
  }
}

module.exports = ContractValuePage;