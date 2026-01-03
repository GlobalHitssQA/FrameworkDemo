package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator dashboard;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void clickSearchField() {
        searchField.click();
    }

    public boolean isSearchFieldFocused() {
        return searchField.evaluate("el => el === document.activeElement").toString().equals("true");
    }

    public void typeInSearchField(String text) {
        searchField.fill(text);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public boolean isSearchExecuted() {
        return page.locator("[data-testid='search-loading'], [data-testid='prospect-search-results']").first().isVisible();
    }

    public boolean areResultsDisplayed() {
        return searchResults.isVisible();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
}