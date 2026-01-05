package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator dashboardIndicator;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='login-username-input']");
        this.passwordInput = page.locator("[data-testid='login-password-input']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        this.dashboardIndicator = page.locator("[data-testid='dashboard-container']");
    }

    public void navigateToLoginPage() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void loginAsSupportBanker(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
    }

    public boolean isLoginSuccessful() {
        try {
            dashboardIndicator.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
            return dashboardIndicator.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}

class DashboardPage {
    private Page page;
    private Locator dashboardContainer;
    private Locator prospectSearchField;
    private Locator prospectSearchButton;
    private Locator prospectSearchPage;

    public DashboardPage(Page page) {
        this.page = page;
        this.dashboardContainer = page.locator("[data-testid='dashboard-container']");
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.prospectSearchButton = page.locator("[data-testid='prospect-search-button']");
        this.prospectSearchPage = page.locator("[data-testid='prospect-search-page']");
    }

    public void waitForDashboardToLoad() {
        dashboardContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }

    public boolean isProspectSearchFieldVisible() {
        try {
            return prospectSearchField.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isProspectSearchButtonVisible() {
        try {
            return prospectSearchButton.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isProspectSearchPageLoaded() {
        try {
            return prospectSearchPage.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}

class NavigationPage {
    private Page page;
    private Locator prospectSearchMenuItem;

    public NavigationPage(Page page) {
        this.page = page;
        this.prospectSearchMenuItem = page.locator("[data-testid='nav-prospect-search']");
    }

    public boolean isProspectSearchMenuItemVisible() {
        try {
            return prospectSearchMenuItem.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public void attemptToAccessProspectSearchDirectly() {
        try {
            page.navigate("https://actinver.atlassian.net/prospect-search");
            page.waitForLoadState();
        } catch (Exception e) {
            // Expected behavior - access denied or page not found
        }
    }
}