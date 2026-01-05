package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.Response;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;
import java.util.stream.Collectors;

public class ProspectSearchPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardContainer;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator loadingIndicator;
    private Locator errorMessage;
    private List<String> networkRequests;

    public ProspectSearchPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboardContainer = page.locator("[data-testid='actinver-dashboard']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.loadingIndicator = page.locator("[data-testid='loading-spinner']");
        this.errorMessage = page.locator("[data-testid='error-message']");
    }

    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void performLogin() {
        usernameInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        usernameInput.fill("advisor@actinver.com");
        passwordInput.fill("TestPassword123");
        loginButton.click();
    }

    public boolean isDashboardVisible() {
        try {
            dashboardContainer.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(10000));
            return dashboardContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public void accessProspectSearch() {
        prospectSearchField.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        prospectSearchField.click();
    }

    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }

    public void enterSearchCriteria(String searchText) {
        prospectSearchField.fill(searchText);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchExecution() {
        try {
            loadingIndicator.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(2000));
            loadingIndicator.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.HIDDEN)
                .setTimeout(15000));
        } catch (Exception e) {
            // Loading indicator may not appear for fast queries
        }
    }

    public boolean verifySalesforceConnection() {
        // Monitor network requests for Salesforce API calls
        Response lastResponse = page.waitForResponse(
            response -> response.url().contains("salesforce") || 
                       response.url().contains("/api/prospects") ||
                       response.url().contains("/search"),
            () -> {}
        );
        
        if (lastResponse != null) {
            String responseUrl = lastResponse.url();
            return responseUrl.contains("salesforce") || 
                   (responseUrl.contains("/api/prospects") && 
                    lastResponse.headers().getOrDefault("x-data-source", "").contains("salesforce"));
        }
        return false;
    }

    public boolean areResultsDisplayed() {
        try {
            searchResultsList.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(10000));
            return searchResultsList.isVisible() && searchResultsList.count() > 0;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean verifyResultsFromSalesforce() {
        // Verify results have Salesforce identifiers
        Locator firstResult = searchResultsList.locator("[data-testid='prospect-item']").first();
        if (firstResult.isVisible()) {
            String resultData = firstResult.getAttribute("data-source");
            String resultId = firstResult.getAttribute("data-prospect-id");
            // Salesforce IDs typically start with specific prefixes (e.g., 003, 001)
            return (resultData != null && resultData.equals("salesforce")) ||
                   (resultId != null && resultId.matches("^00[0-9][a-zA-Z0-9]{12,15}$"));
        }
        return false;
    }

    public String getErrorMessage() {
        if (errorMessage.isVisible()) {
            return errorMessage.textContent();
        }
        return "";
    }
}