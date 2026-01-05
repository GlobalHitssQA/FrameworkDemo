package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;
import java.util.ArrayList;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsContainer;
    private Locator searchHistoryDropdown;
    private Locator searchHistoryItems;
    private Locator firstSearchResult;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsContainer = page.locator("[data-testid='search-results-container']");
        this.searchHistoryDropdown = page.locator("[data-testid='search-history-dropdown']");
        this.searchHistoryItems = page.locator("[data-testid='search-history-item']");
        this.firstSearchResult = page.locator("[data-testid='prospect-result-item']").first();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchField.clear();
        searchField.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        page.waitForTimeout(500);
    }

    public void clearSearchField() {
        if (searchField.isVisible()) {
            searchField.clear();
        }
    }

    public void navigateToSearchField() {
        searchField.scrollIntoViewIfNeeded();
    }

    public void focusOnSearchField() {
        searchField.click();
    }

    public void typeInSearchField(String text) {
        searchField.type(text);
        page.waitForTimeout(300);
    }

    public boolean isSearchHistoryDropdownVisible() {
        return searchHistoryDropdown.isVisible();
    }

    public List<String> getSearchHistoryItems() {
        List<String> historyItems = new ArrayList<>();
        int count = searchHistoryItems.count();
        
        for (int i = 0; i < count; i++) {
            historyItems.add(searchHistoryItems.nth(i).textContent().trim());
        }
        
        return historyItems;
    }

    public int getSearchHistoryItemCount() {
        return searchHistoryItems.count();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }
}