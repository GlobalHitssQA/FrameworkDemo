package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator noResultsMessage;
    private Locator validationError;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.validationError = page.locator("[data-testid='search-validation-error']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net");
        page.waitForLoadState();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchQuery(String query) {
        searchField.fill(query);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(1000);
        try {
            page.waitForSelector("[data-testid='search-results-list'], [data-testid='no-results-message']", 
                new Page.WaitForSelectorOptions().setTimeout(5000));
        } catch (Exception e) {
            // Results or message should appear
        }
    }

    public boolean areResultsOrNoResultsMessageDisplayed() {
        return searchResultsList.isVisible() || noResultsMessage.isVisible();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public boolean isValidationErrorDisplayed() {
        try {
            return validationError.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchFunctionalityWorking() {
        return searchField.isEnabled() && searchButton.isEnabled();
    }
}