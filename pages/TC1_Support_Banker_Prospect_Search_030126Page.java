package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class ProspectManagementPage {
    private Page page;
    private Locator prospectManagementSection;
    private Locator prospectSearchContainer;
    private Locator searchInputField;
    private Locator searchButton;
    private Locator prospectManagementMenu;

    public ProspectManagementPage(Page page) {
        this.page = page;
        this.prospectManagementSection = page.locator("[data-testid='prospect-management-section']");
        this.prospectSearchContainer = page.locator("[data-testid='prospect-search-container']");
        this.searchInputField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.prospectManagementMenu = page.locator("[data-testid='prospect-management-menu']");
    }

    public void navigateToProspectManagement() {
        prospectManagementMenu.click();
        page.waitForLoadState();
    }

    public boolean isProspectManagementSectionVisible() {
        return prospectManagementSection.isVisible();
    }

    public boolean isProspectSearchVisible() {
        try {
            return prospectSearchContainer.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchInputFieldVisible() {
        try {
            return searchInputField.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isSearchButtonVisible() {
        try {
            return searchButton.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
}

class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator userProfile;

    public LoginPage(Page page) {
        this.page = page;
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        this.userProfile = page.locator("[data-testid='user-profile']");
    }

    public void loginAsSupportBanker(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
        page.waitForLoadState();
    }

    public boolean isLoginSuccessful() {
        return userProfile.isVisible();
    }
}