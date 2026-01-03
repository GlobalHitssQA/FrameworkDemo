package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator resultsContainer;
    private Locator resultsList;
    private Locator prospectItems;
    private Locator prospectNames;
    private Locator prospectEmails;
    private Locator scrollContainer;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='prospects-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.prospectNames = page.locator("[data-testid='prospect-name']");
        this.prospectEmails = page.locator("[data-testid='prospect-email']");
        this.scrollContainer = page.locator("[data-testid='scrollable-results']");
    }

    public void navigateToProspectSearch() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
    }

    public boolean isSearchScreenReady() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void performSearch(String searchTerm) {
        searchInput.fill(searchTerm);
        searchButton.click();
    }

    public void waitForSearchResults() {
        resultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        prospectItems.first().waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public int getVisibleResultsCount() {
        return prospectItems.count();
    }

    public boolean isScrollContainerVisible() {
        return scrollContainer.isVisible();
    }

    public boolean isResultsScrollable() {
        Object scrollHeight = scrollContainer.evaluate("element => element.scrollHeight");
        Object clientHeight = scrollContainer.evaluate("element => element.clientHeight");
        return ((Number) scrollHeight).intValue() > ((Number) clientHeight).intValue();
    }

    public void scrollToBottomOfResults() {
        scrollContainer.evaluate("element => element.scrollTo(0, element.scrollHeight)");
        page.waitForTimeout(1000);
    }

    public void scrollToTopOfResults() {
        scrollContainer.evaluate("element => element.scrollTo(0, 0)");
        page.waitForTimeout(500);
    }

    public int getTotalResultsCount() {
        return prospectItems.count();
    }

    public String getProspectNameAtIndex(int index) {
        if (index >= prospectNames.count()) {
            return null;
        }
        Locator nameElement = prospectNames.nth(index);
        nameElement.scrollIntoViewIfNeeded();
        return nameElement.textContent();
    }

    public String getProspectEmailAtIndex(int index) {
        if (index >= prospectEmails.count()) {
            return null;
        }
        Locator emailElement = prospectEmails.nth(index);
        emailElement.scrollIntoViewIfNeeded();
        return emailElement.textContent();
    }
}