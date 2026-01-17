const { expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

class ContractValueComponentPage {
  constructor(page) {
    this.page = page;
    
    this.loginUsernameInput = '[data-testid="login-username"]';
    this.loginPasswordInput = '[data-testid="login-password"]';
    this.loginSubmitButton = '[data-testid="login-submit"]';
    
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.contractSearchButton = '[data-testid="contract-search-button"]';
    this.contractListItem = '[data-testid="contract-list-item"]';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.purchasePowerMXN = '[data-testid="purchase-power-mxn"]';
    this.cashMXN = '[data-testid="cash-mxn"]';
    this.cashUSD = '[data-testid="cash-usd"]';
    this.fundsList = '[data-testid="funds-list"]';
    this.debtFunds = '[data-testid="debt-funds"]';
    this.hedgeFunds = '[data-testid="hedge-funds"]';
    this.equityFunds = '[data-testid="equity-funds"]';
    this.moneyMarketSection = '[data-testid="money-market-section"]';
    this.capitalSection = '[data-testid="capital-section"]';
    this.pendingSettlement = '[data-testid="pending-settlement"]';
    
    this.componentTitle = '[data-testid="component-title"]';
    this.componentLabels = '[data-testid="component-label"]';
    this.componentValues = '[data-testid="component-value"]';
    this.componentIcons = '[data-testid="component-icon"]';
    
    this.figmaSpecs = {
      textColors: {
        primary: '#1A1A1A',
        secondary: '#666666',
        accent: '#0066CC',
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        muted: '#999999'
      },
      backgroundColors: {
        primary: '#FFFFFF',
        secondary: '#F5F5F5',
        accent: '#E6F0FF',
        card: '#FAFAFA'
      },
      borderIconColors: {
        border: '#E0E0E0',
        iconPrimary: '#333333',
        iconSecondary: '#666666',
        iconAccent: '#0066CC'
      },
      typography: {
        fontFamily: 'Inter, sans-serif',
        sizes: {
          title: '24px',
          subtitle: '18px',
          body: '14px',
          caption: '12px',
          small: '10px'
        },
        weights: {
          bold: '700',
          semibold: '600',
          medium: '500',
          regular: '400'
        },
        styles: {
          normal: 'normal',
          italic: 'italic'
        }
      }
    };
  }

  async navigateToLogin() {
    await this.page.goto(process.env.BASE_URL || 'https://acticenter.example.com');
  }

  async performLogin() {
    const username = process.env.TEST_USERNAME || 'testuser';
    const password = process.env.TEST_PASSWORD || 'testpass';
    await this.page.fill(this.loginUsernameInput, username);
    await this.page.fill(this.loginPasswordInput, password);
    await this.page.click(this.loginSubmitButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectContract() {
    await this.page.click(this.contractSearchButton);
    await this.page.waitForSelector(this.contractListItem);
    await this.page.click(this.contractListItem + ':first-child');
    await this.page.waitForLoadState('networkidle');
  }

  async openContractValueComponent() {
    await this.page.waitForSelector(this.contractValueComponent);
    await this.page.click(this.contractValueComponent);
    await this.page.waitForSelector(this.breakdownPopup);
  }

  async isComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async getTextColors() {
    const colors = {};
    const elements = [
      { name: 'title', selector: this.componentTitle },
      { name: 'labels', selector: this.componentLabels },
      { name: 'values', selector: this.componentValues },
      { name: 'totalValue', selector: this.totalValueDisplay },
      { name: 'purchasePower', selector: this.purchasePowerMXN },
      { name: 'cashMXN', selector: this.cashMXN },
      { name: 'cashUSD', selector: this.cashUSD }
    ];

    for (const element of elements) {
      const elementHandle = await this.page.$(element.selector);
      if (elementHandle) {
        colors[element.name] = await this.page.evaluate(
          el => window.getComputedStyle(el).color,
          elementHandle
        );
      }
    }
    return colors;
  }

  async getBackgroundColors() {
    const colors = {};
    const elements = [
      { name: 'component', selector: this.contractValueComponent },
      { name: 'popup', selector: this.breakdownPopup },
      { name: 'fundsList', selector: this.fundsList },
      { name: 'moneyMarket', selector: this.moneyMarketSection },
      { name: 'capital', selector: this.capitalSection }
    ];

    for (const element of elements) {
      const elementHandle = await this.page.$(element.selector);
      if (elementHandle) {
        colors[element.name] = await this.page.evaluate(
          el => window.getComputedStyle(el).backgroundColor,
          elementHandle
        );
      }
    }
    return colors;
  }

  async getBorderAndIconColors() {
    const colors = {};
    
    const componentHandle = await this.page.$(this.contractValueComponent);
    if (componentHandle) {
      colors.componentBorder = await this.page.evaluate(
        el => window.getComputedStyle(el).borderColor,
        componentHandle
      );
    }

    const iconHandles = await this.page.$$(this.componentIcons);
    colors.icons = [];
    for (const iconHandle of iconHandles) {
      const iconColor = await this.page.evaluate(
        el => window.getComputedStyle(el).color || window.getComputedStyle(el).fill,
        iconHandle
      );
      colors.icons.push(iconColor);
    }
    return colors;
  }

  async getTypographyProperties() {
    const typography = {};
    const elements = [
      { name: 'title', selector: this.componentTitle },
      { name: 'labels', selector: this.componentLabels },
      { name: 'values', selector: this.componentValues },
      { name: 'totalValue', selector: this.totalValueDisplay }
    ];

    for (const element of elements) {
      const elementHandle = await this.page.$(element.selector);
      if (elementHandle) {
        typography[element.name] = await this.page.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            fontFamily: styles.fontFamily,
            fontSize: styles.fontSize,
            fontWeight: styles.fontWeight,
            fontStyle: styles.fontStyle
          };
        }, elementHandle);
      }
    }
    return typography;
  }

  getFigmaTextColors() {
    return this.figmaSpecs.textColors;
  }

  getFigmaBackgroundColors() {
    return this.figmaSpecs.backgroundColors;
  }

  getFigmaBorderIconColors() {
    return this.figmaSpecs.borderIconColors;
  }

  getFigmaFontFamily() {
    return this.figmaSpecs.typography.fontFamily;
  }

  getFigmaFontSizes() {
    return this.figmaSpecs.typography.sizes;
  }

  getFigmaFontWeights() {
    return this.figmaSpecs.typography.weights;
  }

  getFigmaFontStyles() {
    return this.figmaSpecs.typography.styles;
  }

  rgbToHex(rgb) {
    if (!rgb || rgb === 'transparent') return null;
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return rgb;
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  compareColors(actualColors, expectedColors, type) {
    const discrepancies = [];
    for (const [key, actualValue] of Object.entries(actualColors)) {
      if (Array.isArray(actualValue)) {
        actualValue.forEach((color, index) => {
          const hexColor = this.rgbToHex(color);
          const isMatch = Object.values(expectedColors).some(
            expected => expected.toUpperCase() === hexColor
          );
          if (!isMatch) {
            discrepancies.push({
              type: type,
              element: key + '[' + index + ']',
              actual: hexColor,
              expected: 'One of: ' + Object.values(expectedColors).join(', ')
            });
          }
        });
      } else {
        const hexColor = this.rgbToHex(actualValue);
        const isMatch = Object.values(expectedColors).some(
          expected => expected.toUpperCase() === hexColor
        );
        if (!isMatch) {
          discrepancies.push({
            type: type,
            element: key,
            actual: hexColor,
            expected: 'One of: ' + Object.values(expectedColors).join(', ')
          });
        }
      }
    }
    return discrepancies;
  }

  compareFontFamily(typographyProps, expectedFamily) {
    const discrepancies = [];
    for (const [element, props] of Object.entries(typographyProps)) {
      if (props && props.fontFamily) {
        const actualFamily = props.fontFamily.toLowerCase();
        const expectedLower = expectedFamily.toLowerCase();
        if (!actualFamily.includes(expectedLower.split(',')[0].trim())) {
          discrepancies.push({
            type: 'font-family',
            element: element,
            actual: props.fontFamily,
            expected: expectedFamily
          });
        }
      }
    }
    return discrepancies;
  }

  compareFontSizes(typographyProps, expectedSizes) {
    const discrepancies = [];
    const sizeValues = Object.values(expectedSizes);
    for (const [element, props] of Object.entries(typographyProps)) {
      if (props && props.fontSize) {
        if (!sizeValues.includes(props.fontSize)) {
          discrepancies.push({
            type: 'font-size',
            element: element,
            actual: props.fontSize,
            expected: 'One of: ' + sizeValues.join(', ')
          });
        }
      }
    }
    return discrepancies;
  }

  compareFontWeights(typographyProps, expectedWeights) {
    const discrepancies = [];
    const weightValues = Object.values(expectedWeights);
    for (const [element, props] of Object.entries(typographyProps)) {
      if (props && props.fontWeight) {
        if (!weightValues.includes(props.fontWeight)) {
          discrepancies.push({
            type: 'font-weight',
            element: element,
            actual: props.fontWeight,
            expected: 'One of: ' + weightValues.join(', ')
          });
        }
      }
    }
    return discrepancies;
  }

  compareFontStyles(typographyProps, expectedStyles) {
    const discrepancies = [];
    const styleValues = Object.values(expectedStyles);
    for (const [element, props] of Object.entries(typographyProps)) {
      if (props && props.fontStyle) {
        if (!styleValues.includes(props.fontStyle)) {
          discrepancies.push({
            type: 'font-style',
            element: element,
            actual: props.fontStyle,
            expected: 'One of: ' + styleValues.join(', ')
          });
        }
      }
    }
    return discrepancies;
  }

  async documentDiscrepancies(discrepancies) {
    const reportPath = path.join(process.cwd(), 'reports', 'design-discrepancies.json');
    const reportDir = path.dirname(reportPath);
    
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const report = {
      testId: 93,
      timestamp: new Date().toISOString(),
      component: 'Contract Value and Composition',
      totalDiscrepancies: discrepancies.length,
      discrepancies: discrepancies
    };

    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    return reportPath;
  }

  async verifyDiscrepanciesDocumented(discrepancies) {
    const reportPath = path.join(process.cwd(), 'reports', 'design-discrepancies.json');
    if (!fs.existsSync(reportPath)) {
      return discrepancies.length === 0;
    }
    const savedReport = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    return savedReport.discrepancies.length === discrepancies.length;
  }
}

module.exports = ContractValueComponentPage;