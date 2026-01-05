package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultItems;
    private Locator dashboardContainer;
    private Locator errorMessage;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.dashboardContainer = page.locator("[data-testid='actinver-dashboard']");
        this.errorMessage = page.locator("[data-testid='search-error-message']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net");
        page.waitForLoadState();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterProspectName(String prospectName) {
        searchField.fill(prospectName);
    }

    public void clearSearchField() {
        searchField.clear();
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public int getSearchResultsCount() {
        return resultItems.count();
    }

    public String getResultText(int index) {
        return resultItems.nth(index).textContent();
    }

    public void selectProspect(int index) {
        resultItems.nth(index).click();
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }

    public String getErrorMessageText() {
        return errorMessage.textContent();
    }

    public void scrollToMoreResults() {
        searchResults.evaluate("element => element.scrollTop = element.scrollHeight");
    }
}