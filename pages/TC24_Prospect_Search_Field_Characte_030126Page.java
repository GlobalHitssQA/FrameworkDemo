package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator dashboardContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='search-results-list']");
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net");
        dashboardContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchText(String text) {
        searchField.fill(text);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areResultsDisplayed() {
        return resultsContainer.isVisible();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public boolean isSearchCompleted() {
        return resultsContainer.isVisible() || page.locator("[data-testid='no-results-message']").isVisible();
    }

    public String getSearchFieldMaxLength() {
        return searchField.getAttribute("maxlength");
    }
}