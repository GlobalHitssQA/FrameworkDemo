package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Response;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator resultsList;
    private Locator prospectNameField;
    private Locator prospectEmailField;
    private Locator loadingIndicator;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.resultsList = page.locator("[data-testid='prospects-list']");
        this.prospectNameField = page.locator("[data-testid='prospect-name']");
        this.prospectEmailField = page.locator("[data-testid='prospect-email']");
        this.loadingIndicator = page.locator("[data-testid='loading-spinner']");
    }
    
    public boolean isSearchScreenDisplayed() {
        return searchField.isVisible() && searchButton.isVisible();
    }
    
    public void enterSearchTerm(String searchTerm) {
        searchField.fill(searchTerm);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public void waitForSearchResults() {
        loadingIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.HIDDEN).setTimeout(10000));
        searchResults.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
    }
    
    public boolean areResultsDisplayed() {
        return searchResults.isVisible() && resultsList.count() > 0;
    }
    
    public boolean verifySalesforceQueryExecution() {
        return page.waitForResponse(
            response -> response.url().contains("salesforce") || 
                       response.url().contains("/api/prospects/search"),
            () -> {}
        ) != null;
    }
    
    public boolean verifyResultsFromAdvisorScope() {
        page.waitForTimeout(1000);
        int resultsCount = resultsList.locator("[data-testid='prospect-item']").count();
        return resultsCount > 0;
    }
    
    public boolean verifyAllResultsFromSalesforceList() {
        Locator prospectItems = resultsList.locator("[data-testid='prospect-item']");
        int count = prospectItems.count();
        
        for (int i = 0; i < count; i++) {
            Locator item = prospectItems.nth(i);
            String dataSource = item.getAttribute("data-source");
            if (dataSource == null || !dataSource.equalsIgnoreCase("salesforce")) {
                return false;
            }
        }
        return count > 0;
    }
    
    public String getFirstProspectName() {
        return prospectNameField.first().textContent();
    }
    
    public String getFirstProspectEmail() {
        return prospectEmailField.first().textContent();
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchLink;
    private String baseUrl = "https://actinver.atlassian.net";
    
    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-nav']");
    }
    
    public void navigateToDashboard() {
        page.navigate(baseUrl + "/dashboard");
        page.waitForLoadState();
    }
    
    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }
    
    public void navigateToProspectSearch() {
        prospectSearchLink.click();
        page.waitForLoadState();
    }
}