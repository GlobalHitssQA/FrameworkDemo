package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator noResultsMessage;
    private Locator searchResultsList;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
    }

    public void accessSearchFunctionality() {
        searchField.waitFor();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isNoResultsMessageVisible() {
        noResultsMessage.waitFor();
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    public boolean isSearchResultsListVisible() {
        return searchResultsList.isVisible();
    }
}

class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private String dashboardUrl = "https://actinver.atlassian.net/dashboard";

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToDashboard() {
        page.navigate(dashboardUrl);
    }

    public boolean isDashboardVisible() {
        dashboardContainer.waitFor();
        return dashboardContainer.isVisible();
    }
}