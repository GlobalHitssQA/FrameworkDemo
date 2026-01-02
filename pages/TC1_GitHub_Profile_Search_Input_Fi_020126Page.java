package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (basados en mejores prácticas y estructura típica de GitHub)
    private Locator searchInputField;
    private Locator searchButton;
    
    public GitHubSearchPage(Page page) {
        this.page = page;
        // Selectores inferidos priorizando data-testid y roles ARIA
        this.searchInputField = page.locator("[data-testid='github-search-input'], input[type='text'][placeholder*='username'], input[aria-label*='Search']").first();
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='Search'], button:has-text('Search')").first();
    }
    
    public void navigateTo(String url) {
        page.navigate(url);
    }
    
    public void waitForComponentToLoad() {
        searchInputField.waitFor();
    }
    
    public boolean isInputFieldVisible() {
        return searchInputField.isVisible();
    }
    
    public boolean isSearchButtonVisible() {
        return searchButton.isVisible();
    }
    
    public void clickInputField() {
        searchInputField.click();
    }
    
    public boolean isInputFieldFocused() {
        return searchInputField.evaluate("el => el === document.activeElement").toString().equals("true");
    }
    
    public void typeIntoSearchField(String text) {
        searchInputField.fill(text);
    }
    
    public String getInputFieldValue() {
        return searchInputField.inputValue();
    }
    
    public void clearInputField() {
        searchInputField.clear();
    }
}