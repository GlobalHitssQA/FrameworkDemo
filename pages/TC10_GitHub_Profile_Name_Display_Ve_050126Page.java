package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {
    private Page page;
    
    // Locators - INFERIDOS (basados en buenas prácticas y convenciones)
    private Locator searchInput;
    private Locator searchButton;
    private Locator fullNameElement;
    private Locator usernameElement;
    private Locator profileContainer;
    private Locator nameContainer;
    
    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Locators inferidos con selectores semánticos
        this.searchInput = page.locator("[data-testid='github-search-input'], input[type='text'][placeholder*='username'], #search-username");
        this.searchButton = page.locator("[data-testid='search-button'], button[aria-label*='Search'], button.search-btn");
        this.fullNameElement = page.locator("[data-testid='user-fullname'], .profile-name, .user-profile-name, h1.name");
        this.usernameElement = page.locator("[data-testid='user-username'], .profile-username, .user-login, span.username");
        this.profileContainer = page.locator("[data-testid='profile-container'], .profile-details, .user-profile");
        this.nameContainer = page.locator("[data-testid='name-container'], .profile-name-section, .user-info-header");
    }
    
    public void navigateToSearchComponent() {
        page.navigate("https://github.com");
        page.waitForLoadState();
    }
    
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }
    
    public void enterUsername(String username) {
        searchInput.fill(username);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public void waitForProfileToLoad() {
        profileContainer.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }
    
    public boolean isFullNameVisible() {
        return fullNameElement.isVisible();
    }
    
    public String getFullName() {
        return fullNameElement.textContent().trim();
    }
    
    public boolean isUsernameVisible() {
        return usernameElement.isVisible();
    }
    
    public String getUsername() {
        return usernameElement.textContent().trim();
    }
    
    public boolean isNameContainerVisible() {
        return nameContainer.isVisible();
    }
    
    public boolean isFullNameAboveUsername() {
        var fullNameBox = fullNameElement.boundingBox();
        var usernameBox = usernameElement.boundingBox();
        
        if (fullNameBox == null || usernameBox == null) {
            return false;
        }
        
        return fullNameBox.y < usernameBox.y;
    }
}