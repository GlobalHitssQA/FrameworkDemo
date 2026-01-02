package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator dashboardContainer;
    private Locator noResultsMessage;
    private Locator searchResultsList;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/dashboard");
        page.waitForLoadState();
    }

    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }

    public boolean isSearchFieldAvailable() {
        return searchField.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return searchField.isEnabled();
    }

    public void enterSearchQuery(String query) {
        searchField.clear();
        searchField.fill(query);
    }

    public void executeSearch() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    public boolean isSearchResultsListVisible() {
        return searchResultsList.isVisible();
    }
}