package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - REAL (extracted from Atlassian login page and inferred for Acticenter)
    private Locator searchField;
    private Locator searchButton;
    private Locator resultsList;
    private Locator prospectNameField;
    private Locator prospectEmailField;
    private Locator firstResultName;
    private Locator firstResultEmail;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        // Real locators from Atlassian + inferred for prospect search
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.resultsList = page.locator("[data-testid='prospect-results-list']");
        this.prospectNameField = page.locator("[data-testid='prospect-name']").first();
        this.prospectEmailField = page.locator("[data-testid='prospect-email']").first();
        this.firstResultName = page.locator(".prospect-result .name").first();
        this.firstResultEmail = page.locator(".prospect-result .email").first();
    }
    
    public void enterProspectName(String prospectName) {
        searchField.fill(prospectName);
    }
    
    public void clickSearchButton() {
        searchButton.click();
        page.waitForTimeout(1000);
    }
    
    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }
    
    public boolean areResultsVisible() {
        return resultsList.isVisible();
    }
    
    public int getResultsCount() {
        return resultsList.locator(".prospect-result").count();
    }
    
    public boolean isProspectNameDisplayed() {
        return prospectNameField.isVisible() || firstResultName.isVisible();
    }
    
    public boolean isProspectEmailDisplayed() {
        return prospectEmailField.isVisible() || firstResultEmail.isVisible();
    }
    
    public String getProspectName() {
        if (prospectNameField.isVisible()) {
            return prospectNameField.textContent();
        } else if (firstResultName.isVisible()) {
            return firstResultName.textContent();
        }
        return null;
    }
    
    public String getProspectEmail() {
        if (prospectEmailField.isVisible()) {
            return prospectEmailField.textContent();
        } else if (firstResultEmail.isVisible()) {
            return firstResultEmail.textContent();
        }
        return null;
    }
}

class LoginPage {
    private Page page;
    
    // Locators - REAL (extracted from Atlassian)
    private Locator emailInput;
    private Locator continueButton;
    private Locator passwordInput;
    private Locator loginButton;
    
    public LoginPage(Page page) {
        this.page = page;
        // Real locators from Atlassian login
        this.emailInput = page.locator("[data-testid='username']");
        this.continueButton = page.locator("[data-testid='login-submit-idf-testid']");
        this.passwordInput = page.locator("[data-testid='password']");
        this.loginButton = page.locator("#login-submit");
    }
    
    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net");
    }
    
    public void login(String email, String password) {
        emailInput.fill(email);
        continueButton.click();
        page.waitForTimeout(1000);
        if (passwordInput.isVisible()) {
            passwordInput.fill(password);
            loginButton.click();
        }
    }
}

class DashboardPage {
    private Page page;
    
    // Locators - INFERRED
    private Locator dashboardContainer;
    private Locator prospectSearchLink;
    
    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.prospectSearchLink = page.locator("[data-testid='prospect-search-nav']");
    }
    
    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }
    
    public void navigateToProspectSearch() {
        prospectSearchLink.click();
    }
}