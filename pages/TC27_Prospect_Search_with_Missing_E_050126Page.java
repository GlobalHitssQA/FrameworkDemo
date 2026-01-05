package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Login locators
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator advisorDashboard;
    
    // Prospect search locators
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchResultsContainer;
    private Locator searchResultsList;
    private Locator noResultsMessage;
    private Locator errorMessage;
    private Locator prospectItems;
    private Locator prospectNameElements;
    private Locator prospectEmailElements;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Login locators (inferred)
        this.usernameInput = page.locator("[data-testid='login-username']");
        this.passwordInput = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        
        // Prospect search locators (inferred based on metadata)
        this.prospectSearchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsContainer = page.locator("[data-testid='search-results-container']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.noResultsMessage = page.locator("[data-testid='no-results-message']");
        this.errorMessage = page.locator("[data-testid='error-message']");
        this.prospectItems = page.locator("[data-testid='prospect-item']");
        this.prospectNameElements = page.locator("[data-testid='prospect-name']");
        this.prospectEmailElements = page.locator("[data-testid='prospect-email']");
    }
    
    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }
    
    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }
    
    public boolean isLoggedIn() {
        return advisorDashboard.isVisible();
    }
    
    public void navigateToProspectSearch() {
        page.locator("[data-testid='prospect-search-menu']").click();
    }
    
    public boolean isSearchInterfaceVisible() {
        return prospectSearchField.isVisible() && searchButton.isVisible();
    }
    
    public void enterSearchCriteria(String criteria) {
        prospectSearchField.fill(criteria);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public void waitForSearchResults() {
        searchResultsContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
    
    public boolean isProspectInResults(String prospectName) {
        Locator prospectLocator = page.locator("[data-testid='prospect-item']").filter(new Locator.FilterOptions().hasText(prospectName));
        return prospectLocator.count() > 0;
    }
    
    public boolean hasErrorMessages() {
        return errorMessage.isVisible();
    }
    
    public boolean isSearchResultsVisible() {
        return searchResultsContainer.isVisible();
    }
    
    public void clearSearchField() {
        prospectSearchField.clear();
    }
    
    public int getSearchResultsCount() {
        return prospectItems.count();
    }
    
    public boolean isProspectSelectable(String prospectName) {
        Locator prospectLocator = page.locator("[data-testid='prospect-item']").filter(new Locator.FilterOptions().hasText(prospectName));
        if (prospectLocator.count() > 0) {
            return prospectLocator.first().isEnabled();
        }
        return false;
    }
    
    public boolean prospectHasName(String prospectName) {
        Locator nameLocator = prospectNameElements.filter(new Locator.FilterOptions().hasText(prospectName));
        return nameLocator.count() > 0 && !nameLocator.first().textContent().trim().isEmpty();
    }
    
    public boolean prospectHasEmail(String prospectName) {
        Locator prospectItem = page.locator("[data-testid='prospect-item']").filter(new Locator.FilterOptions().hasText(prospectName));
        if (prospectItem.count() > 0) {
            Locator emailLocator = prospectItem.first().locator("[data-testid='prospect-email']");
            return emailLocator.count() > 0 && !emailLocator.textContent().trim().isEmpty();
        }
        return false;
    }
}