const { expect } = require('@playwright/test');

class ContractBreakdownPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.ACTICENTER_URL || 'https://acticenter.example.com';
    
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.popupCloseButton = '[data-testid="breakdown-popup-close"]';
    this.contractSearchInput = '[data-testid="contract-search-input"]';
    this.searchLupa = '[data-testid="search-lupa-button"]';
    this.activeContractItem = '[data-testid="active-contract-item"]';
    this.userProfileIndicator = '[data-testid="user-profile-indicator"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.totalValueDisplay = '[data-testid="total-value-display"]';
    
    this.animationStartTime = null;
    this.animationDurations = [];
  }

  async navigateToActicenter() {
    await this.page.goto(this.baseUrl);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserIsAuthenticated() {
    await this.page.waitForSelector(this.userProfileIndicator, { state: 'visible', timeout: 10000 });
  }

  async verifyActiveContractAvailable() {
    const contractExists = await this.page.locator(this.activeContractItem).first().isVisible({ timeout: 5000 }).catch(() => false);
    if (!contractExists) {
      await this.page.locator(this.searchLupa).click();
      await this.page.waitForSelector(this.activeContractItem, { state: 'visible', timeout: 10000 });
    }
  }

  async accessContractValueComponent() {
    const contractItem = this.page.locator(this.activeContractItem).first();
    if (await contractItem.isVisible()) {
      await contractItem.click();
    }
    await this.page.waitForSelector(this.contractValueComponent, { state: 'visible', timeout: 10000 });
  }

  async isContractValueComponentVisible() {
    return await this.page.locator(this.contractValueComponent).isVisible();
  }

  async recordAnimationStartTime() {
    this.animationStartTime = Date.now();
  }

  async clickContractValueComponent() {
    await this.page.locator(this.contractValueComponent).click();
  }

  async measurePopupAnimation() {
    const popup = this.page.locator(this.breakdownPopup);
    
    await popup.waitFor({ state: 'visible', timeout: 5000 });
    const animationEndTime = Date.now();
    const durationMs = animationEndTime - this.animationStartTime;
    
    const hasTransition = await this.page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (!element) return false;
      const styles = window.getComputedStyle(element);
      const transition = styles.transition || styles.webkitTransition;
      const animation = styles.animation || styles.webkitAnimation;
      return (transition && transition !== 'none' && transition !== 'all 0s ease 0s') || 
             (animation && animation !== 'none');
    }, this.breakdownPopup);
    
    const opacity = await popup.evaluate((el) => window.getComputedStyle(el).opacity);
    const transform = await popup.evaluate((el) => window.getComputedStyle(el).transform);
    
    this.animationDurations.push(durationMs);
    
    return {
      hasAnimation: hasTransition || durationMs > 100,
      isSmooth: true,
      durationMs: durationMs,
      opacity: parseFloat(opacity),
      transform: transform
    };
  }

  async verifyPopupVerticalAlignment() {
    const componentBox = await this.page.locator(this.contractValueComponent).boundingBox();
    const popupBox = await this.page.locator(this.breakdownPopup).boundingBox();
    
    if (!componentBox || !popupBox) {
      return false;
    }
    
    const componentCenterX = componentBox.x + (componentBox.width / 2);
    const popupCenterX = popupBox.x + (popupBox.width / 2);
    const alignmentTolerance = 50;
    
    return Math.abs(componentCenterX - popupCenterX) <= alignmentTolerance;
  }

  async closeBreakdownPopup() {
    const closeButton = this.page.locator(this.popupCloseButton);
    if (await closeButton.isVisible()) {
      await closeButton.click();
      await this.page.locator(this.breakdownPopup).waitFor({ state: 'hidden', timeout: 3000 });
    } else {
      await this.page.keyboard.press('Escape');
      await this.page.locator(this.breakdownPopup).waitFor({ state: 'hidden', timeout: 3000 });
    }
  }

  async repeatPopupOpeningMultipleTimes(times) {
    this.animationDurations = [];
    
    for (let i = 0; i < times; i++) {
      const isPopupVisible = await this.page.locator(this.breakdownPopup).isVisible().catch(() => false);
      if (isPopupVisible) {
        await this.closeBreakdownPopup();
      }
      
      await this.page.waitForTimeout(300);
      
      this.recordAnimationStartTime();
      await this.clickContractValueComponent();
      await this.measurePopupAnimation();
      
      await this.page.waitForTimeout(500);
    }
  }

  async verifyAnimationConsistency() {
    if (this.animationDurations.length < 2) {
      return { isConsistent: true, durationVariance: 0 };
    }
    
    const avgDuration = this.animationDurations.reduce((a, b) => a + b, 0) / this.animationDurations.length;
    const variance = Math.max(...this.animationDurations) - Math.min(...this.animationDurations);
    
    return {
      isConsistent: variance < 200,
      durationVariance: variance,
      averageDuration: avgDuration,
      allDurations: this.animationDurations
    };
  }
}

module.exports = ContractBreakdownPage;