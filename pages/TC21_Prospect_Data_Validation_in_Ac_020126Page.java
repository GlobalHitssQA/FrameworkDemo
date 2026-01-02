package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ActicenterProspectSearchPage {
    private Page page;
    
    // Login elements
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    
    // Dashboard elements
    private Locator advisorDashboard;
    
    // Prospect search elements
    private Locator prospectSearchInput;
    private Locator searchButton;
    private Locator searchResults;
    private Locator searchResultsList;
    
    // Prospect data elements
    private Locator firstProspectCard;
    private Locator firstProspectName;
    private Locator firstProspectEmail;
    
    // Prospect detail elements
    private Locator prospectDetailView;
    
    public ActicenterProspectSearchPage(Page page) {
        this.page = page;
        
        // Login locators (inferidos)
        this.usernameInput = page.locator("[data-testid='login-username']");
        this.passwordInput = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        
        // Dashboard locators (inferidos)
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        
        // Search locators (inferidos)
        this.prospectSearchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        
        // Prospect data locators (inferidos)
        this.firstProspectCard = page.locator("[data-testid='prospect-card']").first();
        this.firstProspectName = page.locator("[data-testid='prospect-name']").first();
        this.firstProspectEmail = page.locator("[data-testid='prospect-email']").first();
        
        // Detail view locators (inferidos)
        this.prospectDetailView = page.locator("[data-testid='prospect-detail-view']");
    }
    
    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }
    
    public void performLogin(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }
    
    public boolean isDashboardVisible() {
        return advisorDashboard.isVisible();
    }
    
    public void searchProspect(String searchQuery) {
        prospectSearchInput.fill(searchQuery);
        searchButton.click();
    }
    
    public void waitForSearchResults() {
        searchResults.waitFor();
    }
    
    public String getFirstProspectName() {
        return firstProspectName.textContent();
    }
    
    public String getFirstProspectEmail() {
        return firstProspectEmail.textContent();
    }
    
    public void selectFirstProspect() {
        firstProspectCard.click();
    }
    
    public boolean isProspectDetailVisible() {
        return prospectDetailView.isVisible();
    }
    
    public int getSearchResultsCount() {
        return searchResultsList.locator("[data-testid='prospect-card']").count();
    }
}