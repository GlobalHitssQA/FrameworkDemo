package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS (no se pudo acceder a la aplicación real)
    private Locator usernameField;
    private Locator passwordField;
    private Locator loginButton;
    private Locator prospectSearchField;
    private Locator searchIcon;
    private Locator searchResultsList;
    private Locator searchResultItems;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Login locators (inferidos)
        this.usernameField = page.locator("[data-testid='login-username']");
        this.passwordField = page.locator("[data-testid='login-password']");
        this.loginButton = page.locator("[data-testid='login-submit-button']");
        
        // Prospect search locators (inferidos)
        this.prospectSearchField = page.locator("[data-testid='prospect-search-input']");
        this.searchIcon = page.locator("[data-testid='prospect-search-icon']");
        this.searchResultsList = page.locator("[data-testid='prospect-search-results']");
        this.searchResultItems = page.locator("[data-testid='prospect-search-results'] [data-testid='prospect-item']");
    }
    
    public void navigateToActicenter() {
        page.navigate("https://actinver.atlassian.net");
    }
    
    public void loginAsAdvisor() {
        usernameField.fill("advisor@actinver.com");
        passwordField.fill("password123");
        loginButton.click();
        page.waitForLoadState();
    }
    
    public void navigateToProspectSearch() {
        // Espera a que el dashboard cargue y el campo de búsqueda esté disponible
        prospectSearchField.waitFor();
    }
    
    public boolean isSearchFieldVisible() {
        return prospectSearchField.isVisible();
    }
    
    public boolean isSearchIconVisible() {
        return searchIcon.isVisible();
    }
    
    public void fillSearchField(String searchText) {
        prospectSearchField.clear();
        prospectSearchField.fill(searchText);
    }
    
    public void clearSearchField() {
        prospectSearchField.clear();
    }
    
    public void clickSearchIcon() {
        searchIcon.click();
        // Espera a que los resultados se carguen
        page.waitForTimeout(1000);
    }
    
    public boolean isSearchResultsVisible() {
        return searchResultsList.isVisible();
    }
    
    public int getSearchResultsCount() {
        return searchResultItems.count();
    }
    
    public String getSearchFieldValue() {
        return prospectSearchField.inputValue();
    }
}