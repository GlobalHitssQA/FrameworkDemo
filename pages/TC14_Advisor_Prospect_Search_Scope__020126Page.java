package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator searchResultItems;
    private Locator noResultsMessage;
    private Locator prospectCellInfo;
    private Locator clearSearchButton;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.prospectCellInfo = page.locator("[data-testid='prospect-cell-info']");
        this.clearSearchButton = page.locator("[data-testid='clear-search-button']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void fillSearchCriteria(String criteria) {
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(1000);
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public int getSearchResultsCount() {
        if (!searchResultItems.first().isVisible()) {
            return 0;
        }
        return searchResultItems.count();
    }

    public String getProspectCellFromResult(int index) {
        return searchResultItems.nth(index).locator("[data-testid='prospect-cell-info']").textContent().trim();
    }

    public boolean isNoResultsMessageVisible() {
        try {
            return noResultsMessage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public void clearSearchCriteria() {
        searchField.clear();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }
}