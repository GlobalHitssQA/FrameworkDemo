package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos basados en buenas prácticas
    private Locator prospectSearchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator searchResultsList;
    private Locator firstProspectResult;
    private Locator selectedProspectIndicator;
    private Locator processFlowContainer;
    private Locator errorMessage;
    private Locator processStatusIndicator;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos con selectores semánticos y mantenibles
        this.prospectSearchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='search-results-container']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.firstProspectResult = page.locator("[data-testid='prospect-result-item']").first();
        this.selectedProspectIndicator = page.locator("[data-testid='prospect-selected-indicator']");
        this.processFlowContainer = page.locator("[data-testid='agas43-process-flow']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.processStatusIndicator = page.locator("[data-testid='process-status-active']");
    }
    
    public boolean isSearchInterfaceAvailable() {
        return prospectSearchInput.isVisible() && searchButton.isVisible();
    }
    
    public void enterProspectSearchCriteria(String criteria) {
        prospectSearchInput.clear();
        prospectSearchInput.fill(criteria);
    }
    
    public void clickSearchButton() {
        searchButton.click();
        page.waitForLoadState();
    }
    
    public boolean areSearchResultsDisplayed() {
        return searchResults.isVisible();
    }
    
    public int getSearchResultsCount() {
        return searchResultsList.locator("[data-testid='prospect-result-item']").count();
    }
    
    public void selectFirstProspectFromResults() {
        firstProspectResult.click();
        page.waitForTimeout(500); // Wait for selection animation
    }
    
    public boolean isProspectSelected() {
        return selectedProspectIndicator.isVisible();
    }
    
    public boolean isProcessFlowTriggered() {
        try {
            processFlowContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(5000));
            return processFlowContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public boolean hasErrors() {
        return errorMessage.isVisible();
    }
    
    public boolean isProcessContinuing() {
        return processStatusIndicator.isVisible();
    }
    
    public String getSelectedProspectName() {
        return selectedProspectIndicator.textContent();
    }
}

class ActicenterDashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchButton;
    
    public ActicenterDashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchButton = page.locator("[data-testid='prospect-search-button']");
    }
    
    public void navigateToDashboard() {
        // Asumiendo que la URL base es conocida o se configura externamente
        page.navigate("https://actinver.atlassian.net/dashboard");
        page.waitForLoadState();
    }
    
    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }
    
    public void clickProspectSearchButton() {
        prospectSearchButton.click();
        page.waitForLoadState();
    }
}