package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - inferidos basados en buenas prácticas
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator advisorDashboard;
    private Locator prospectSearchField;
    private Locator searchHistoryDropdown;
    private Locator searchHistoryItems;
    private Locator searchHistoryProspectNames;
    private Locator searchHistoryEmails;
    private Locator currentAdvisorInfo;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Login elements
        this.usernameInput = page.locator("[data-testid='login-username']");
        this.passwordInput = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        
        // Dashboard elements
        this.advisorDashboard = page.locator("[data-testid='advisor-dashboard']");
        this.currentAdvisorInfo = page.locator("[data-testid='current-advisor-email']");
        
        // Search elements
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchHistoryDropdown = page.locator("[data-testid='search-history-dropdown']");
        this.searchHistoryItems = page.locator("[data-testid='search-history-item']");
        this.searchHistoryProspectNames = page.locator("[data-testid='search-history-prospect-name']");
        this.searchHistoryEmails = page.locator("[data-testid='search-history-prospect-email']");
    }

    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void loginAsAdvisor() {
        usernameInput.fill("advisor@actinver.com");
        passwordInput.fill("password123");
        loginButton.click();
        page.waitForLoadState();
    }

    public boolean isAdvisorDashboardVisible() {
        return advisorDashboard.isVisible();
    }

    public String getCurrentAdvisorEmail() {
        return currentAdvisorInfo.textContent();
    }

    public void clickSearchField() {
        prospectSearchField.click();
    }

    public boolean isSearchFieldActive() {
        return prospectSearchField.evaluate("el => el === document.activeElement").toString().equals("true");
    }

    public void typeInSearchField(String text) {
        prospectSearchField.fill(text);
    }

    public boolean isSearchHistoryDropdownVisible() {
        return searchHistoryDropdown.isVisible();
    }

    public int getSearchHistoryCount() {
        return searchHistoryItems.count();
    }

    public boolean allSearchesHaveProspectName() {
        int nameCount = searchHistoryProspectNames.count();
        int itemCount = searchHistoryItems.count();
        return nameCount == itemCount && nameCount > 0;
    }

    public boolean allSearchesHaveEmail() {
        int emailCount = searchHistoryEmails.count();
        int itemCount = searchHistoryItems.count();
        return emailCount == itemCount && emailCount > 0;
    }

    public boolean allSearchesBelongToAdvisor(String advisorEmail) {
        List<String> searchItems = searchHistoryItems.allTextContents();
        
        for (String item : searchItems) {
            String itemAdvisor = page.locator("[data-testid='search-history-item'][data-advisor-email]")
                .first()
                .getAttribute("data-advisor-email");
            
            if (!advisorEmail.equals(itemAdvisor)) {
                return false;
            }
        }
        return true;
    }
}