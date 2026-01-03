package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ActicenterDashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchField;
    private Locator prospectSearchButton;
    private Locator prospectSearchSection;
    private Locator userRoleIndicator;

    public ActicenterDashboardPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.dashboardContainer = page.locator("[data-testid='acticenter-dashboard']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.prospectSearchButton = page.locator("[data-testid='prospect-search-button']");
        this.prospectSearchSection = page.locator("[data-testid='prospect-search-section']");
        this.userRoleIndicator = page.locator("[data-testid='user-role-display']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/acticenter/dashboard");
    }

    public void waitForDashboardToLoad() {
        dashboardContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isProspectSearchVisible() {
        try {
            return prospectSearchSection.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean canAccessProspectSearch() {
        try {
            boolean searchFieldVisible = prospectSearchField.isVisible();
            boolean searchButtonVisible = prospectSearchButton.isVisible();
            return searchFieldVisible || searchButtonVisible;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserRole() {
        return userRoleIndicator.textContent();
    }

    public boolean isDashboardDisplayed() {
        return dashboardContainer.isVisible();
    }
}

class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator authenticationSuccess;

    public LoginPage(Page page) {
        this.page = page;
        // Inferidos - selectores basados en buenas prácticas
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.authenticationSuccess = page.locator("[data-testid='auth-success-indicator']");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net/login");
    }

    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public void waitForSuccessfulAuthentication() {
        authenticationSuccess.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isLoginSuccessful() {
        return authenticationSuccess.isVisible();
    }
}