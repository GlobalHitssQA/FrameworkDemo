package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator prospectResultItems;
    private Locator highlightedNameElements;
    private Locator highlightedEmailElements;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Inferred locators following best practices
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectResultItems = page.locator("[data-testid='prospect-result-item']");
        // Highlighted elements typically use <strong>, <b>, or specific highlight classes
        this.highlightedNameElements = page.locator("[data-testid='prospect-name'] strong, [data-testid='prospect-name'] .highlight");
        this.highlightedEmailElements = page.locator("[data-testid='prospect-email'] strong, [data-testid='prospect-email'] .highlight");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void enterSearchCriteria(String searchTerm) {
        searchField.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public int getSearchResultsCount() {
        return prospectResultItems.count();
    }

    public boolean areProspectNamesHighlighted() {
        return highlightedNameElements.count() > 0;
    }

    public boolean areEmailAddressesHighlighted() {
        return highlightedEmailElements.count() > 0;
    }

    public void clearSearchField() {
        searchField.clear();
    }
}