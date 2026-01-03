package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import java.util.List;
import java.util.ArrayList;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no hay URL válida para inspección real)
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    private Locator prospectSearchMenu;
    private Locator searchInputField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator searchSuggestions;
    private Locator suggestionItems;
    private Locator clearSearchButton;
    private Locator dashboard;

    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Login elements
        this.usernameInput = page.locator("[data-testid='username-input']");
        this.passwordInput = page.locator("[data-testid='password-input']");
        this.loginButton = page.locator("[data-testid='login-button']");
        
        // Navigation elements
        this.prospectSearchMenu = page.locator("[data-testid='prospect-search-menu']");
        this.dashboard = page.locator("[data-testid='dashboard']");
        
        // Search elements
        this.searchInputField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='search-button']");
        this.searchResults = page.locator("[data-testid='search-results-list']");
        this.clearSearchButton = page.locator("[data-testid='clear-search-button']");
        
        // Search history suggestions
        this.searchSuggestions = page.locator("[data-testid='search-suggestions-dropdown']");
        this.suggestionItems = page.locator("[data-testid='suggestion-item']");
    }

    public void navigateToActicenter() {
        page.navigate("https://acticenter.actinver.com");
    }

    public void performLogin() {
        usernameInput.fill("advisor@actinver.com");
        passwordInput.fill("TestPassword123");
        loginButton.click();
        page.waitForLoadState();
    }

    public boolean isLoggedIn() {
        return dashboard.isVisible();
    }

    public void navigateToProspectSearch() {
        prospectSearchMenu.click();
        page.waitForLoadState();
    }

    public boolean isProspectSearchDisplayed() {
        return searchInputField.isVisible();
    }

    public void performSearch(String searchTerm) {
        searchInputField.fill(searchTerm);
        searchButton.click();
        page.waitForTimeout(1000);
    }

    public boolean areSearchResultsDisplayed() {
        return searchResults.isVisible();
    }

    public void clearSearch() {
        if (clearSearchButton.isVisible()) {
            clearSearchButton.click();
        } else {
            searchInputField.clear();
        }
        page.waitForTimeout(500);
    }

    public void focusSearchField() {
        searchInputField.click();
    }

    public boolean isSearchFieldFocused() {
        return searchInputField.evaluate("el => el === document.activeElement").equals(true);
    }

    public void typeInSearchField(String text) {
        searchInputField.type(text, new Locator.TypeOptions().setDelay(100));
        page.waitForTimeout(500);
    }

    public boolean areSearchSuggestionsDisplayed() {
        return searchSuggestions.isVisible();
    }

    public int getSearchSuggestionCount() {
        return suggestionItems.count();
    }

    public List<String> getSearchSuggestions() {
        List<String> suggestions = new ArrayList<>();
        int count = suggestionItems.count();
        
        for (int i = 0; i < count; i++) {
            suggestions.add(suggestionItems.nth(i).textContent());
        }
        
        return suggestions;
    }
}