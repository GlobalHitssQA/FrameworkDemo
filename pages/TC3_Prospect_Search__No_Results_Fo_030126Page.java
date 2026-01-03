package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator noResultsMessage;
    private Locator dashboard;
    private Locator resultsList;
    private Locator prospectSearchSection;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
        this.resultsList = page.locator("[data-testid='search-results-list']");
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
    }

    public void navigateToProspectSearch() {
        page.locator("[data-testid='prospect-search-nav']").click();
    }

    public boolean isProspectSearchInterfaceDisplayed() {
        return prospectSearchSection.isVisible();
    }

    public void enterSearchQuery(String query) {
        prospectSearchField.fill(query);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        page.waitForTimeout(1000);
    }

    public boolean isNoResultsMessageVisible() {
        return noResultsMessage.isVisible();
    }

    public String getNoResultsMessageText() {
        return noResultsMessage.textContent();
    }

    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }

    public boolean isSearchFieldEnabled() {
        return prospectSearchField.isEnabled();
    }

    public boolean isSearchButtonEnabled() {
        return searchButton.isEnabled();
    }
}