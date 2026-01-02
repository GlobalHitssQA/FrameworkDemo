package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class ProspectSearchPage {
    private Page page;
    
    // Locators - INFERIDOS basados en buenas prácticas
    private Locator dashboardContainer;
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchIcon;
    private Locator resultsContainer;
    private Locator resultItems;
    private Locator highlightedText;
    private Locator scrollableResults;
    
    public ProspectSearchPage(Page page) {
        this.page = page;
        
        // Locators inferidos usando data-testid y selectores semánticos
        this.dashboardContainer = page.locator("[data-testid='advisor-dashboard']");
        this.searchInput = page.locator("[data-testid='prospect-search-input']");
        this.searchButton = page.locator("[data-testid='prospect-search-button']");
        this.searchIcon = page.locator("[data-testid='search-icon']");
        this.resultsContainer = page.locator("[data-testid='search-results-container']");
        this.resultItems = page.locator("[data-testid='prospect-result-item']");
        this.highlightedText = page.locator("[data-testid='prospect-result-item'] strong, [data-testid='prospect-result-item'] b");
        this.scrollableResults = page.locator("[data-testid='search-results-list']");
    }
    
    public boolean isDashboardVisible() {
        return dashboardContainer.isVisible();
    }
    
    public void enterSearchTerm(String searchTerm) {
        searchInput.clear();
        searchInput.fill(searchTerm);
    }
    
    public void executeSearch() {
        // Intentar click en botón, si no existe presionar Enter
        if (searchButton.isVisible()) {
            searchButton.click();
        } else if (searchIcon.isVisible()) {
            searchIcon.click();
        } else {
            searchInput.press("Enter");
        }
    }
    
    public boolean areResultsVisible() {
        return resultsContainer.isVisible();
    }
    
    public boolean isHighlightedTextPresent() {
        return highlightedText.count() > 0;
    }
    
    public int getVisibleResultsCount() {
        return resultItems.count();
    }
    
    public int getTotalResultsCount() {
        // Asume que hay un atributo o texto que indica el total
        String totalText = page.locator("[data-testid='total-results-count']").textContent();
        try {
            return Integer.parseInt(totalText);
        } catch (Exception e) {
            return resultItems.count();
        }
    }
    
    public boolean isScrollAvailable() {
        // Verifica si el contenedor de resultados tiene scroll
        Object scrollHeight = scrollableResults.evaluate("element => element.scrollHeight");
        Object clientHeight = scrollableResults.evaluate("element => element.clientHeight");
        
        if (scrollHeight instanceof Integer && clientHeight instanceof Integer) {
            return (Integer) scrollHeight > (Integer) clientHeight;
        }
        return false;
    }
}

package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

public class LoginPage {
    private Page page;
    private Locator usernameInput;
    private Locator passwordInput;
    private Locator loginButton;
    
    public LoginPage(Page page) {
        this.page = page;
        
        // Locators inferidos
        this.usernameInput = page.locator("[data-testid='username-input'], #username, input[name='username']");
        this.passwordInput = page.locator("[data-testid='password-input'], #password, input[name='password']");
        this.loginButton = page.locator("[data-testid='login-button'], button[type='submit']");
    }
    
    public void navigateToLogin() {
        page.navigate("https://actinver.atlassian.net/login");
    }
    
    public void login(String username, String password) {
        usernameInput.fill(username);
        passwordInput.fill(password);
        loginButton.click();
        page.waitForLoadState();
    }
}