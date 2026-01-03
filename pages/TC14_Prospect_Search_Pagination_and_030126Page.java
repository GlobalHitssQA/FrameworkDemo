package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultsContainer;
    private Locator resultItems;
    private Locator loadingIndicator;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferred locators based on common prospect search UI patterns
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results']");
        this.resultsContainer = page.locator("[data-testid='results-container']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");
    }

    public boolean isSearchScreenVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchTerm(String searchTerm) {
        searchInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        // Wait for loading to complete
        if (loadingIndicator.isVisible()) {
            loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN));
        }
    }

    public int getTotalResultsCount() {
        return resultItems.count();
    }

    public int getVisibleResultsCount() {
        int visibleCount = 0;
        int totalItems = resultItems.count();
        for (int i = 0; i < totalItems; i++) {
            if (resultItems.nth(i).isVisible()) {
                visibleCount++;
            }
        }
        return visibleCount;
    }

    public void scrollToLoadMoreResults() {
        // Scroll to the last visible result to trigger lazy loading
        Locator lastVisibleResult = resultItems.nth(4); // 5th element (0-indexed)
        lastVisibleResult.scrollIntoViewIfNeeded();
        page.waitForTimeout(500); // Small wait for scroll to complete
    }

    public void waitForAdditionalResults() {
        page.waitForTimeout(1000); // Wait for additional results to load
    }

    public void scrollToBottom() {
        resultsContainer.evaluate("element => element.scrollTop = element.scrollHeight");
        page.waitForTimeout(500);
    }
}

class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;

    public DashboardPage(Page page) {
        this.page = page;
        // Inferred locators for dashboard
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-link']");
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }
}