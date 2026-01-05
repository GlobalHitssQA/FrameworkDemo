package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchIcon;
    private Locator searchResults;
    private Locator resultItems;
    private Locator highlightedText;
    private Locator prospectSearchContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchIcon = page.locator("[data-testid='prospect-search-icon']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.highlightedText = page.locator(".highlight, mark, [data-testid='highlighted-match']");
        this.prospectSearchContainer = page.locator("[data-testid='prospect-search-container']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public boolean isSearchIconVisible() {
        return searchIcon.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchField.fill(criteria);
    }

    public void enterSearchCriteriaWithoutSearching(String criteria) {
        searchField.fill(criteria);
        page.waitForTimeout(500);
    }

    public String getSearchFieldValue() {
        return searchField.inputValue();
    }

    public void clickSearchIcon() {
        searchIcon.click();
        page.waitForTimeout(1000);
    }

    public boolean isSearchResultsVisible() {
        try {
            searchResults.waitForSelector("visible", new Locator.WaitForOptions().setTimeout(3000));
            return searchResults.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean hasHighlightedMatches() {
        return highlightedText.count() > 0;
    }

    public int getVisibleResultsCount() {
        return resultItems.count();
    }

    public void clearSearchField() {
        searchField.clear();
    }
}