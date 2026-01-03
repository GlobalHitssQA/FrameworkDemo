package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectSearchPage {
    private Page page;
    private Locator prospectSearchField;
    private Locator searchButton;
    private Locator searchInterface;
    private Locator prospectSearchLink;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchInterface = page.locator("[data-testid='prospect-search-interface']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-nav-link']");
    }
    
    public void navigateToProspectSearch() {
        prospectSearchLink.click();
        page.waitForSelector("[data-testid='prospect-search-interface']");
    }
    
    public boolean isSearchInterfaceVisible() {
        return searchInterface.isVisible();
    }
    
    public void enterSearchText(String text) {
        prospectSearchField.fill(text);
    }
    
    public void clearSearchField() {
        prospectSearchField.clear();
    }
    
    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }
}

class LoginPage {
    private Page page;
    private Locator usernameField;
    private Locator passwordField;
    private Locator loginButton;
    private Locator dashboardIndicator;
    
    public LoginPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.usernameField = page.locator("[data-testid='username-input']");
        this.passwordField = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboardIndicator = page.locator("[data-testid='dashboard']");
    }
    
    public void navigateToLogin() {
        page.navigate("https://acticenter.actinver.com/login");
    }
    
    public void login(String username, String password) {
        usernameField.fill(username);
        passwordField.fill(password);
        loginButton.click();
        page.waitForSelector("[data-testid='dashboard']");
    }
    
    public boolean isLoginSuccessful() {
        return dashboardIndicator.isVisible();
    }
}