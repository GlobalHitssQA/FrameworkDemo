package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.AriaRole;

public class GitHubSearchPage {
    
    private Page page;
    
    // Locators - INFERRED based on best practices
    private Locator usernameInput;
    private Locator searchButton;
    private Locator repoCounter;
    private Locator followersCounter;
    private Locator followingCounter;
    private Locator gistsCounter;
    private Locator userAvatar;
    private Locator userFullName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator errorMessage;
    
    public GitHubSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Primary input field for GitHub username search
        this.usernameInput = page.locator("input[data-testid='username-input']");
        
        // Search button with magnifying glass icon
        this.searchButton = page.locator("button[data-testid='search-button']");
        
        // User metrics counters
        this.repoCounter = page.locator("[data-testid='repo-count']");
        this.followersCounter = page.locator("[data-testid='followers-count']");
        this.followingCounter = page.locator("[data-testid='following-count']");
        this.gistsCounter = page.locator("[data-testid='gists-count']");
        
        // User profile elements
        this.userAvatar = page.locator("img[data-testid='user-avatar']");
        this.userFullName = page.locator("[data-testid='user-fullname']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        
        // Error message for non-existent users
        this.errorMessage = page.locator("[data-testid='error-message']");
    }
    
    // Navigation
    public void navigateToSearchComponent() {
        page.navigate("https://github.com");
    }
    
    // Username Input Field Methods
    public boolean isUsernameInputPresent() {
        return usernameInput.count() > 0;
    }
    
    public boolean isUsernameInputVisible() {
        return usernameInput.isVisible();
    }
    
    public boolean isUsernameInputEnabled() {
        return usernameInput.isEnabled();
    }
    
    public void enterUsername(String username) {
        usernameInput.clear();
        usernameInput.fill(username);
    }
    
    public String getUsernameInputValue() {
        return usernameInput.inputValue();
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    // User Metrics Methods
    public String getRepoCount() {
        return repoCounter.textContent();
    }
    
    public String getFollowersCount() {
        return followersCounter.textContent();
    }
    
    public String getFollowingCount() {
        return followingCounter.textContent();
    }
    
    public String getGistsCount() {
        return gistsCounter.textContent();
    }
    
    // User Profile Methods
    public boolean isUserAvatarVisible() {
        return userAvatar.isVisible();
    }
    
    public String getUserFullName() {
        return userFullName.textContent();
    }
    
    public String getUserBio() {
        return userBio.textContent();
    }
    
    public String getUserLocation() {
        return userLocation.textContent();
    }
    
    public String getUserCompany() {
        return userCompany.textContent();
    }
    
    // Error Handling
    public boolean isErrorMessageVisible() {
        return errorMessage.isVisible();
    }
    
    public String getErrorMessage() {
        return errorMessage.textContent();
    }
}