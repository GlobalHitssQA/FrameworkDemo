package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResultsList;
    private Locator prospectNameFields;
    private Locator emailKeyFields;

    public ProspectSearchPage(Page page) {
        this.page = page;
        // Login locators (inferidos)
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        
        // Search locators (inferidos)
        this.searchField = page.locator("[data-testid='prospect-search-field']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchResultsList = page.locator("[data-testid='search-results-list']");
        
        // Result item locators (inferidos)
        this.prospectNameFields = page.locator("[data-testid='prospect-name']");
        this.emailKeyFields = page.locator("[data-testid='prospect-email-key']");
    }

    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }

    public void performLogin() {
        usernameInput.fill("advisor@actinver.com");
        passwordInput.fill("testPassword123");
        loginButton.click();
        page.waitForLoadState();
    }

    public void navigateToProspectSearch() {
        page.waitForSelector("[data-testid='prospect-search-field']");
    }

    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }

    public void typeInSearchField(String searchText) {
        searchField.fill(searchText);
        page.waitForTimeout(500);
    }

    public boolean areSearchResultsDisplayed() {
        return searchResultsList.isVisible() && prospectNameFields.count() > 0;
    }

    public boolean allResultsHaveProspectNames() {
        int resultCount = prospectNameFields.count();
        if (resultCount == 0) return false;
        
        for (int i = 0; i < resultCount; i++) {
            String name = prospectNameFields.nth(i).textContent();
            if (name == null || name.trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean allResultsHaveEmailKeys() {
        int resultCount = emailKeyFields.count();
        if (resultCount == 0) return false;
        
        for (int i = 0; i < resultCount; i++) {
            String email = emailKeyFields.nth(i).textContent();
            if (email == null || email.trim().isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public boolean areProspectNamesReadable() {
        int resultCount = prospectNameFields.count();
        if (resultCount == 0) return false;
        
        for (int i = 0; i < resultCount; i++) {
            Locator nameLocator = prospectNameFields.nth(i);
            if (!nameLocator.isVisible()) return false;
            
            String fontSize = nameLocator.evaluate("el => window.getComputedStyle(el).fontSize").toString();
            double size = Double.parseDouble(fontSize.replace("px", ""));
            if (size < 12) return false;
        }
        return true;
    }

    public boolean areEmailKeysReadable() {
        int resultCount = emailKeyFields.count();
        if (resultCount == 0) return false;
        
        for (int i = 0; i < resultCount; i++) {
            Locator emailLocator = emailKeyFields.nth(i);
            if (!emailLocator.isVisible()) return false;
            
            String fontSize = emailLocator.evaluate("el => window.getComputedStyle(el).fontSize").toString();
            double size = Double.parseDouble(fontSize.replace("px", ""));
            if (size < 12) return false;
        }
        return true;
    }
}