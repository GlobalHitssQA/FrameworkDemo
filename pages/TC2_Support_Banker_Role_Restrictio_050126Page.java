package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class LoginPage {
    private Page page;
    private Locator usernameField;
    private Locator passwordField;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameField = page.locator("[data-testid='username-input']");
        this.passwordField = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.dashboardIndicator = page.locator("[data-testid='dashboard-container']");
    }

    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net/login");
    }

    public void login(String username, String password) {
        usernameField.fill(username);
        passwordField.fill(password);
        loginButton.click();
    }

    public void waitForLoginComplete() {
        dashboardIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }
}

class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchField;
    private Locator prospectSearchButton;
    private Locator supportBankerMenu;
    private Locator navigationMenu;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='dashboard-container']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-field']");
        this.prospectSearchButton = page.locator("[data-testid='prospect-search-button']");
        this.supportBankerMenu = page.locator("[data-testid='support-banker-menu']");
        this.navigationMenu = page.locator("[data-testid='navigation-menu']");
    }

    public void navigateToDashboard() {
        page.navigate("https://actinver.atlassian.net/dashboard");
        dashboardContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE));
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean hasSupportBankerFunctionalities() {
        return supportBankerMenu.isVisible() && navigationMenu.isVisible();
    }

    public boolean isProspectSearchVisible() {
        try {
            return prospectSearchField.isVisible(new Locator.IsVisibleOptions().setTimeout(2000));
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isProspectSearchEnabled() {
        try {
            if (!prospectSearchField.isVisible(new Locator.IsVisibleOptions().setTimeout(2000))) {
                return false;
            }
            return prospectSearchField.isEnabled();
        } catch (Exception e) {
            return false;
        }
    }

    public void verifyNoProspectSearchAccess() {
        int prospectSearchElements = page.locator("[data-testid*='prospect-search']").count();
        if (prospectSearchElements > 0) {
            throw new AssertionError("Prospect search elements found when they should not be accessible");
        }
    }
}