package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator resultItems;
    private Locator clearButton;
    private Locator backToDashboardButton;
    private Locator prospectDetailsPanel;
    private Locator searchInterface;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.clearButton = page.locator("[data-testid='clear-search-button']");
        this.backToDashboardButton = page.locator("[data-testid='back-to-dashboard-button']");
        this.prospectDetailsPanel = page.locator("[data-testid='prospect-details-panel']");
        this.searchInterface = page.locator("[data-testid='prospect-search-interface']");
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }

    public boolean areSearchResultsDisplayed() {
        return searchResultsList.isVisible();
    }

    public int getResultCount() {
        return resultItems.count();
    }

    public boolean isSearchInterfaceDisplayed() {
        return searchInterface.isVisible();
    }

    public void clearSearchOrNavigateBack() {
        if (clearButton.isVisible()) {
            clearButton.click();
        }
        if (backToDashboardButton.isVisible()) {
            backToDashboardButton.click();
        }
    }

    public boolean isProspectDetailsDisplayed() {
        return prospectDetailsPanel.isVisible();
    }

    public void scrollResults() {
        searchResultsList.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}

class AdvisorDashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;
    private Locator dashboardStateIndicator;

    public AdvisorDashboardPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
        this.dashboardStateIndicator = page.locator("[data-testid='dashboard-state']");
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
        page.waitForLoadState();
    }

    public boolean isDashboardAccessible() {
        return dashboardContainer.isVisible();
    }

    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }

    public String getCurrentDashboardState() {
        if (dashboardStateIndicator.isVisible()) {
            return dashboardStateIndicator.textContent();
        }
        return page.url();
    }
}