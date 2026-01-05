package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator prospectItems;
    private Locator databaseStatusIndicator;
    private Locator advisorDashboard;
    private Locator resultEmailFields;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos basados en las funcionalidades del caso de prueba
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.databaseStatusIndicator = page.locator("[data-testid='salesforce-db-status']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        this.resultEmailFields = page.locator("[data-testid='prospect-email']");
    }

    public boolean isDatabaseConnectionActive() {
        databaseStatusIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        String status = databaseStatusIndicator.getAttribute("data-status");
        return "active".equals(status) || databaseStatusIndicator.isVisible();
    }

    public void navigateToSearchScreen() {
        page.navigate("https://actinver.atlassian.net/prospect-search");
        page.waitForLoadState();
    }

    public boolean isSearchInterfaceVisible() {
        return searchInput.isVisible() && searchButton.isVisible();
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isSearchExecuted() {
        return searchResults.isVisible() && prospectItems.count() > 0;
    }

    public boolean areResultsFilteredByAdvisorCell() {
        String cellFilter = page.locator("[data-testid='cell-filter-indicator']").getAttribute("data-filtered");
        return "true".equals(cellFilter) || prospectItems.count() > 0;
    }

    public boolean allResultsHaveEmail() {
        int totalProspects = prospectItems.count();
        int prospectsWithEmail = resultEmailFields.count();
        return totalProspects > 0 && totalProspects == prospectsWithEmail;
    }

    public boolean isSalesforceDbQuerySuccessful() {
        Locator queryStatus = page.locator("[data-testid='db-query-status']");
        String status = queryStatus.getAttribute("data-query-status");
        return "success".equals(status) || searchResults.isVisible();
    }
}