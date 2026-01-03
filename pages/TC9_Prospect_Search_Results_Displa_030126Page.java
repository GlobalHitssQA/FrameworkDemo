package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (siguiendo buenas prácticas)
    private Locator prospectSearchMenuItem;
    private Locator searchTermInput;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator searchResultItems;
    private Locator prospectNameFields;
    private Locator emailFields;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos basados en buenas prácticas de data-testid y selectores semánticos
        this.prospectSearchMenuItem = page.locator("[data-testid='menu-prospect-search']");
        this.searchTermInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResultsList = page.locator("[data-testid='prospect-results-list']");
        this.searchResultItems = page.locator("[data-testid='prospect-result-item']");
        this.prospectNameFields = page.locator("[data-testid='prospect-name']");
        this.emailFields = page.locator("[data-testid='prospect-email']");
    }

    public void navigateToProspectSearch() {
        prospectSearchMenuItem.click();
    }

    public void waitForSearchScreen() {
        searchTermInput.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public void enterSearchTerm(String searchTerm) {
        searchTermInput.fill(searchTerm);
    }

    public void clickSearchButton() {
        searchButton.click();
    }

    public void waitForSearchResults() {
        searchResultsList.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
        // Esperar a que se carguen los resultados
        page.waitForTimeout(1000);
    }

    public int getVisibleResultsCount() {
        return searchResultItems.count();
    }

    public boolean isProspectNameVisible(int index) {
        return prospectNameFields.nth(index).isVisible();
    }

    public String getProspectName(int index) {
        return prospectNameFields.nth(index).textContent().trim();
    }

    public boolean isEmailVisible(int index) {
        return emailFields.nth(index).isVisible();
    }

    public String getEmail(int index) {
        return emailFields.nth(index).textContent().trim();
    }
}

// LoginPage class for authentication
class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboard;

    public LoginPage(Page page) {
        this.page = page;
        
        // Locators inferidos para la página de login
        this.usernameInput = page.locator("[data-testid='login-username']");
        this.passwordInput = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.dashboard = page.locator("[data-testid='advisor-dashboard']");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public void waitForDashboard() {
        dashboard.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}