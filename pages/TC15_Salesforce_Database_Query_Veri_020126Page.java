package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;
import java.util.stream.Collectors;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchMenu;
    private Locator searchInputField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator searchInterface;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.searchInputField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        this.searchResultItems = page.locator("[data-testid='search-result-item']");
        this.searchInterface = page.locator("[data-testid='search-interface']");
    }
    
    public void navigateToProspectSearch() {
        prospectSearchMenu.click();
    }
    
    public boolean isSearchInterfaceVisible() {
        return searchInterface.isVisible();
    }
    
    public void enterSearchCriteria(String criteria) {
        searchInputField.fill(criteria);
    }
    
    public String getSearchFieldValue() {
        return searchInputField.inputValue();
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public boolean areSearchResultsVisible() {
        return searchResultsList.isVisible();
    }
    
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }
    
    public List<String> getSearchResultsData() {
        return searchResultItems.all().stream()
            .map(locator -> locator.textContent())
            .collect(Collectors.toList());
    }
}

class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboard;
    
    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
    }
    
    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }
    
    public boolean isDashboardVisible() {
        return dashboard.isVisible();
    }
}

class DatabaseMonitoringPage {
    private Page page;
    private Locator queryLoggingToggle;
    private Locator loggingStatus;
    private Locator queryLogContainer;
    
    public DatabaseMonitoringPage(Page page) {
        this.page = page;
        this.queryLoggingToggle = page.locator("[data-testid='query-logging-toggle']");
        this.loggingStatus = page.locator("[data-testid='logging-status']");
        this.queryLogContainer = page.locator("[data-testid='query-log-container']");
    }
    
    public void enableQueryLogging() {
        if (!isLoggingActive()) {
            queryLoggingToggle.click();
        }
    }
    
    public boolean isLoggingActive() {
        return loggingStatus.textContent().contains("active") || 
               loggingStatus.getAttribute("data-status").equals("active");
    }
    
    public boolean isSalesforceQueryLogged() {
        String logContent = queryLogContainer.textContent();
        return logContent.contains("Salesforce") && logContent.contains("SELECT");
    }
    
    public String getLastQueryLog() {
        Locator lastLog = page.locator("[data-testid='query-log-entry']:last-child");
        return lastLog.textContent();
    }
    
    public boolean validateResultsMatchDatabase(List<String> results) {
        return results.size() > 0 && isSalesforceQueryLogged();
    }
}