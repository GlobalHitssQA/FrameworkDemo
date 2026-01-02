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
    private Locator highlightedText;
    private Locator prospectNames;
    private Locator emailKeys;
    private Locator advisorDashboard;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.highlightedText = page.locator(".highlighted-match, mark, [data-testid='highlighted-text']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.emailKeys = page.locator("[data-testid='prospect-email-key']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public void waitForDashboardToLoad() {
        advisorDashboard.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void focusSearchField() {
        searchField.click();
    }

    public void typeInSearchField(String text) {
        searchField.fill(text);
    }

    public boolean areSearchResultsVisible() {
        try {
            searchResults.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(5000));
            return searchResults.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public int getSearchResultsCount() {
        return searchResultItems.count();
    }

    public boolean areMatchingCharactersHighlighted() {
        return highlightedText.count() > 0;
    }

    public boolean areProspectNamesDisplayed() {
        return prospectNames.count() > 0 && prospectNames.first().isVisible();
    }

    public boolean areEmailKeysDisplayed() {
        return emailKeys.count() > 0 && emailKeys.first().isVisible();
    }

    public String getFirstProspectName() {
        return prospectNames.first().textContent();
    }

    public String getFirstEmailKey() {
        return emailKeys.first().textContent();
    }
}