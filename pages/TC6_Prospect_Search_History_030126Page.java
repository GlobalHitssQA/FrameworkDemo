package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;
import java.util.List;

public class ProspectSearchPage {
    private Page page;
    private Locator searchField;
    private Locator searchButton;
    private Locator searchResults;
    private Locator suggestionsList;
    private Locator suggestionItems;
    private Locator dashboardLink;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        // Locators inferidos siguiendo buenas prácticas
        this.searchField = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchResults = page.locator("[data-testid='prospect-search-results']");
        this.suggestionsList = page.locator("[data-testid='search-suggestions-list']");
        this.suggestionItems = page.locator("[data-testid='search-suggestion-item']");
        this.dashboardLink = page.locator("[data-testid='advisor-dashboard-link']");
    }
    
    public void navigateToSearchField() {
        if (!searchField.isVisible()) {
            dashboardLink.click();
            page.waitForSelector("[data-testid='prospect-search-input']");
        }
    }
    
    public boolean isSearchFieldVisible() {
        return searchField.isVisible();
    }
    
    public void clickSearchField() {
        searchField.click();
        page.waitForTimeout(500);
    }
    
    public void performSearch(String searchTerm) {
        searchField.clear();
        searchField.fill(searchTerm);
        searchButton.click();
    }
    
    public void waitForSearchResults() {
        searchResults.waitFor();
        page.waitForTimeout(1000);
    }
    
    public boolean areSuggestionsVisible() {
        return suggestionsList.isVisible();
    }
    
    public int getSuggestionsCount() {
        return suggestionItems.count();
    }
    
    public boolean verifySuggestionsContainNameAndEmail() {
        List<Locator> suggestions = suggestionItems.all();
        
        for (Locator suggestion : suggestions) {
            String text = suggestion.textContent();
            // Verificar que contiene tanto nombre como email (patrón básico)
            boolean hasName = text.matches(".*[A-Za-z]+\\s+[A-Za-z]+.*");
            boolean hasEmail = text.matches(".*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}.*");
            
            if (!hasName || !hasEmail) {
                return false;
            }
        }
        return true;
    }
    
    public void typeInSearchField(String text) {
        searchField.type(text);
    }
}