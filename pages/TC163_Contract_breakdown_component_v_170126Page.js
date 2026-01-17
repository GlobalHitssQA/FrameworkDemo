class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownList = '[data-testid="breakdown-items-list"]';
    this.closeBreakdownButton = '[data-testid="breakdown-close-button"]';
    this.searchClientInput = '[data-testid="search-client-contract"]';
    this.searchLupa = '[data-testid="search-lupa-icon"]';
    this.contractSelector = '[data-testid="contract-selector"]';
    this.activeContractItem = '[data-testid="contract-item-active"]';
    this.overlayBackdrop = '[data-testid="breakdown-overlay"]';
    this.breakdownItemRow = '[data-testid="breakdown-item-row"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    this.loginButton = '[data-testid="login-button"]';
    this.usernameInput = '[data-testid="username-input"]';
    this.passwordInput = '[data-testid="password-input"]';
  }

  async navigateToActicenter() {
    await this.page.goto(process.env.ACTICENTER_BASE_URL || 'https://acticenter.example.com');
    await this.page.waitForLoadState('networkidle');
  }

  async authenticateUser() {
    const credentials = {
      username: process.env.TEST_USERNAME || 'testuser',
      password: process.env.TEST_PASSWORD || 'testpassword'
    };
    
    await this.page.fill(this.usernameInput, credentials.username);
    await this.page.fill(this.passwordInput, credentials.password);
    await this.page.click(this.loginButton);
    await this.page.waitForLoadState('networkidle');
  }

  async selectActiveContract() {
    await this.page.click(this.contractSelector);
    await this.page.waitForSelector(this.activeContractItem, { state: 'visible' });
    await this.page.click(this.activeContractItem);
    await this.page.waitForLoadState('networkidle');
  }

  async isContractValueComponentVisible() {
    return await this.page.isVisible(this.contractValueComponent);
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async isBreakdownListVisible() {
    await this.page.waitForSelector(this.breakdownList, { state: 'visible', timeout: 5000 });
    return await this.page.isVisible(this.breakdownList);
  }

  async clickOutsideBreakdown() {
    const backdrop = await this.page.$(this.overlayBackdrop);
    if (backdrop) {
      await backdrop.click({ position: { x: 10, y: 10 } });
    } else {
      await this.page.click('body', { position: { x: 0, y: 0 } });
    }
  }

  async isBreakdownClosed() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
    return !(await this.page.isVisible(this.breakdownPopup));
  }

  async waitForBreakdownOpen() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible', timeout: 5000 });
  }

  async waitForBreakdownClose() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'hidden', timeout: 5000 });
  }

  async measureCloseTransition() {
    const metrics = {
      isSmooth: true,
      hasNoJumps: true,
      durationMs: 0
    };

    const startTime = Date.now();
    
    const transitionData = await this.page.evaluate((selector) => {
      return new Promise((resolve) => {
        const element = document.querySelector(selector);
        if (!element) {
          resolve({ isSmooth: false, hasNoJumps: false, frames: [] });
          return;
        }

        const frames = [];
        let lastOpacity = 1;
        let lastHeight = element.offsetHeight;
        let hasJumps = false;
        
        const observer = new MutationObserver(() => {
          const currentOpacity = parseFloat(getComputedStyle(element).opacity);
          const currentHeight = element.offsetHeight;
          
          const opacityDelta = Math.abs(currentOpacity - lastOpacity);
          const heightDelta = Math.abs(currentHeight - lastHeight);
          
          if (opacityDelta > 0.3 || heightDelta > 50) {
            hasJumps = true;
          }
          
          frames.push({ opacity: currentOpacity, height: currentHeight });
          lastOpacity = currentOpacity;
          lastHeight = currentHeight;
        });

        observer.observe(element, {
          attributes: true,
          attributeFilter: ['style', 'class']
        });

        setTimeout(() => {
          observer.disconnect();
          resolve({
            isSmooth: frames.length >= 2,
            hasNoJumps: !hasJumps,
            frames: frames
          });
        }, 1000);
      });
    }, this.breakdownPopup);

    const endTime = Date.now();
    
    metrics.isSmooth = transitionData.isSmooth;
    metrics.hasNoJumps = transitionData.hasNoJumps;
    metrics.durationMs = endTime - startTime;

    const computedStyles = await this.page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const styles = getComputedStyle(el);
      return {
        transition: styles.transition,
        animation: styles.animation
      };
    }, this.breakdownPopup);

    if (computedStyles) {
      const hasTransition = computedStyles.transition && computedStyles.transition !== 'none';
      const hasAnimation = computedStyles.animation && computedStyles.animation !== 'none';
      metrics.isSmooth = metrics.isSmooth && (hasTransition || hasAnimation);
    }

    return metrics;
  }

  async getBreakdownItems() {
    return await this.page.$$eval(this.breakdownItemRow, (rows) => {
      return rows.map((row) => ({
        text: row.textContent,
        visible: row.offsetParent !== null
      }));
    });
  }

  async getTotalContractValue() {
    return await this.page.textContent(this.totalValueDisplay);
  }
}

module.exports = ContractBreakdownPage;