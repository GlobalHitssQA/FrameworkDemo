package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ActicenterDashboardPage {
    private Page page;
    private String baseUrl = "https://actinver.atlassian.net";
    
    // Locators - INFERIDOS
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator prospectNameList;
    private Locator prospectEmailList;
    private Locator firstProspectSelectButton;
    private Locator noResultsMessage;
    private Locator missingEmailMessage;
    private Locator salesforceConnectionIndicator;
    private Locator processSelectionScreen;
    private Locator prospectContextIndicator;
    private Locator createNewProspectButton;
    private Locator dashboardContainer;

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search components
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        
        // Prospect information
        this.prospectNameList = page.locator("[data-testid='prospect-name']");
        this.prospectEmailList = page.locator("[data-testid='prospect-email']");
        this.firstProspectSelectButton = page.locator("[data-testid='select-prospect-button']").first();
        
        // Messages
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.missingEmailMessage = page.locator("[data-testid='missing-email-message']");
        
        // Connection and navigation
        this.salesforceConnectionIndicator = page.locator("[data-testid='salesforce-connection-status']");
        this.processSelectionScreen = page.locator("[data-testid='process-selection-screen']");
        this.prospectContextIndicator = page.locator("[data-testid='prospect-context']");
        
        // Dashboard components
        this.createNewProspectButton = page.locator("[data-testid='create-new-prospect-button']");
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
    }

    public void navigateToDashboard() {
        page.navigate(baseUrl + "/dashboard");
        page.waitForLoadState();
    }

    public boolean isSalesforceConnectionActive() {
        return salesforceConnectionIndicator.isVisible() && 
               salesforceConnectionIndicator.getAttribute("data-status").equals("active");
    }

    public void enterSearchCriteria(String criteria) {
        searchInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        searchInput.fill(criteria);
    }

    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsDisplayed() {
        return searchResults.isVisible();
    }

    public int getSearchResultsCount() {
        return prospectNameList.count();
    }

    public String getFirstProspectName() {
        return prospectNameList.first().textContent();
    }

    public String getFirstProspectEmail() {
        return prospectEmailList.first().textContent();
    }

    public void clearSearch() {
        searchInput.clear();
    }

    public boolean isMissingEmailMessageDisplayed() {
        return missingEmailMessage.isVisible();
    }

    public String getMissingEmailMessageText() {
        return missingEmailMessage.textContent();
    }

    public boolean isNoResultsMessageDisplayed() {
        return noResultsMessage.isVisible();
    }

    public void selectFirstProspect() {
        firstProspectSelectButton.click();
        page.waitForLoadState();
    }

    public boolean isOnProcessSelectionScreen() {
        return processSelectionScreen.isVisible();
    }

    public boolean isProspectContextMaintained() {
        return prospectContextIndicator.isVisible() && 
               prospectContextIndicator.textContent().length() > 0;
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isCreateNewProspectButtonVisible() {
        return createNewProspectButton.isVisible();
    }
}