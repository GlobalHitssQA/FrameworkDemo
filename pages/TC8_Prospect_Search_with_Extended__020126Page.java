package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator dashboard;
    private Locator searchButton;
    private Locator searchField;
    private Locator searchResults;
    private Locator noResultsMessage;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }

    public void accessSearchFunctionality() {
        searchField.click();
    }

    public boolean isSearchFieldActive() {
        return searchField.isVisible() && searchField.isEnabled();
    }

    public void fillSearchField(String text) {
        searchField.fill(text);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public boolean isSearchResultsVisible() {
        return searchResults.isVisible();
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }
}