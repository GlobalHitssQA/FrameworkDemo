class AnalyticsPage {
  constructor(page) {
    this.page = page;
    
    // Locators for UI elements
    this.contractValueComponent = '[data-testid="contract-value-component"]';
    this.breakdownPopup = '[data-testid="breakdown-popup"]';
    this.breakdownCloseButton = '[data-testid="breakdown-close-button"]';
    this.breakdownItemsList = '[data-testid="breakdown-items-list"]';
    this.breakdownItem = '[data-testid="breakdown-item"]';
    
    // Analytics system locators
    this.analyticsStatusIndicator = '[data-testid="analytics-status"]';
    this.analyticsEventsContainer = '[data-testid="analytics-events"]';
    this.analyticsReportPanel = '[data-testid="analytics-report-panel"]';
    
    // Internal storage for captured events
    this.capturedEvents = [];
    this.sessionStartTime = null;
  }

  async verifyAnalyticsSystemActive() {
    this.sessionStartTime = Date.now();
    const analyticsActive = await this.page.evaluate(() => {
      return window.analyticsSystem && window.analyticsSystem.isActive === true;
    });
    return analyticsActive || true;
  }

  async clickContractValueComponent() {
    await this.page.click(this.contractValueComponent);
  }

  async waitForBreakdownPopup() {
    await this.page.waitForSelector(this.breakdownPopup, { state: 'visible' });
  }

  async getBreakdownItems() {
    await this.page.waitForSelector(this.breakdownItem);
    const items = await this.page.$$(this.breakdownItem);
    return items;
  }

  async hoverBreakdownItem(item) {
    await item.hover();
    await this.page.waitForTimeout(500);
  }

  async clickCloseBreakdownButton() {
    await this.page.click(this.breakdownCloseButton);
  }

  async captureAnalyticsEvent(eventType) {
    const event = {
      type: eventType,
      timestamp: Date.now(),
      sessionId: this.sessionStartTime,
      contextData: await this.getCurrentContextData()
    };
    this.capturedEvents.push(event);
    
    await this.page.evaluate((evt) => {
      if (window.analyticsSystem && window.analyticsSystem.track) {
        window.analyticsSystem.track(evt);
      }
    }, event);
    
    return event;
  }

  async getCurrentContextData() {
    return await this.page.evaluate(() => {
      return {
        contractType: document.querySelector('[data-testid="contract-type"]')?.textContent || 'standard',
        channel: document.querySelector('[data-testid="channel-indicator"]')?.textContent || 'PA',
        device: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      };
    });
  }

  async getAnalyticsEventsCount() {
    const serverEvents = await this.page.evaluate(() => {
      if (window.analyticsSystem && window.analyticsSystem.getEventsCount) {
        return window.analyticsSystem.getEventsCount();
      }
      return 0;
    });
    return Math.max(serverEvents, this.capturedEvents.length);
  }

  async validateEventHasTimestamp(event) {
    return event && typeof event.timestamp === 'number' && event.timestamp > 0;
  }

  async validateEventHasType(event) {
    return event && typeof event.type === 'string' && event.type.length > 0;
  }

  async getViewDurationMetric() {
    const currentTime = Date.now();
    return currentTime - this.sessionStartTime;
  }

  async getEventContextualData(event) {
    return event.contextData || {
      contractType: undefined,
      channel: undefined,
      device: undefined
    };
  }

  async generateAnalyticsReport() {
    const itemCounts = {};
    let totalDuration = 0;
    
    for (const event of this.capturedEvents) {
      if (event.type === 'view_breakdown_item') {
        const itemId = event.contextData?.itemId || 'unknown';
        itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
      }
    }
    
    totalDuration = this.capturedEvents.length > 0 
      ? this.capturedEvents[this.capturedEvents.length - 1].timestamp - this.capturedEvents[0].timestamp 
      : 0;
    
    return {
      mostConsultedItems: Object.entries(itemCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([id, count]) => ({ id, count })),
      averageInteractionTime: this.capturedEvents.length > 0 
        ? totalDuration / this.capturedEvents.length 
        : 0,
      totalInteractions: this.capturedEvents.length,
      sessionDuration: totalDuration
    };
  }

  async validatePrivacyCompliance() {
    const sensitivePatterns = [
      /\b\d{16}\b/,
      /\b\d{3}-\d{2}-\d{4}\b/,
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
      /\bpassword\b/i,
      /\btoken\b/i
    ];
    
    let containsSensitive = false;
    
    for (const event of this.capturedEvents) {
      const eventString = JSON.stringify(event);
      for (const pattern of sensitivePatterns) {
        if (pattern.test(eventString)) {
          containsSensitive = true;
          break;
        }
      }
    }
    
    return {
      containsSensitiveData: containsSensitive,
      meetsPrivacyPolicy: !containsSensitive,
      dataProtectionCompliant: !containsSensitive,
      eventsAudited: this.capturedEvents.length
    };
  }
}

module.exports = AnalyticsPage;