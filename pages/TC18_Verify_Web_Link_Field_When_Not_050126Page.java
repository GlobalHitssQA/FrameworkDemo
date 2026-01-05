package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class ProfileSearchPage {
    private Page page;
    
    // Search component locators
    private Locator searchInput;
    private Locator searchButton;
    private Locator searchComponent;
    
    // Profile details locators
    private Locator userDetailsSection;
    private Locator userAvatar;
    private Locator userName;
    private Locator userBio;
    private Locator userLocation;
    private Locator userCompany;
    private Locator userWebLink;
    private Locator webLinkIcon;
    
    // Metrics locators
    private Locator repositoriesCount;
    private Locator followersCount;
    private Locator followingCount;
    private Locator gistsCount;
    
    // Loading indicator
    private Locator loadingIndicator;
    
    public ProfileSearchPage(Page page) {
        this.page = page;
        
        // Initialize search component locators
        this.searchComponent = page.locator("[data-testid='search-component']");
        this.searchInput = page.locator("input[data-testid='username-input']");
        this.searchButton = page.locator("button[data-testid='search-button']");
        
        // Initialize user details section locators
        this.userDetailsSection = page.locator("[data-testid='user-details-section']");
        this.userAvatar = page.locator("img[data-testid='user-avatar']");
        this.userName = page.locator("[data-testid='user-name']");
        this.userBio = page.locator("[data-testid='user-bio']");
        this.userLocation = page.locator("[data-testid='user-location']");
        this.userCompany = page.locator("[data-testid='user-company']");
        this.userWebLink = page.locator("[data-testid='user-web-link']");
        this.webLinkIcon = page.locator("[data-testid='web-link-icon']");
        
        // Initialize metrics locators
        this.repositoriesCount = page.locator("[data-testid='repos-count']");
        this.followersCount = page.locator("[data-testid='followers-count']");
        this.followingCount = page.locator("[data-testid='following-count']");
        this.gistsCount = page.locator("[data-testid='gists-count']");
        
        // Loading indicator
        this.loadingIndicator = page.locator("[data-testid='loading-indicator']");
    }
    
    public void navigateToSearchPage() {
        page.navigate("https://github.com");
    }
    
    public boolean isSearchComponentVisible() {
        return searchComponent.isVisible() && 
               searchInput.isVisible() && 
               searchButton.isVisible();
    }
    
    public void enterUsername(String username) {
        searchInput.fill(username);
    }
    
    public void clickSearchButton() {
        searchButton.click();
    }
    
    public void waitForProfileLoad() {
        try {
            loadingIndicator.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.HIDDEN)
                .setTimeout(10000));
        } catch (Exception e) {
            // If loading indicator doesn't exist, wait for user details section
            userDetailsSection.waitFor(new Locator.WaitForOptions()
                .setState(WaitForSelectorState.VISIBLE)
                .setTimeout(10000));
        }
    }
    
    public boolean isUserDetailsSectionVisible() {
        return userDetailsSection.isVisible();
    }
    
    public String getWebLinkText() {
        try {
            if (userWebLink.isVisible()) {
                String text = userWebLink.textContent();
                return text != null ? text.trim() : "";
            }
            return "";
        } catch (Exception e) {
            return "";
        }
    }
    
    public boolean isWebLinkEmpty() {
        try {
            String webLink = getWebLinkText();
            return webLink == null || webLink.isEmpty();
        } catch (Exception e) {
            return true;
        }
    }
    
    public String getUserName() {
        return userName.textContent();
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
    
    public String getRepositoriesCount() {
        return repositoriesCount.textContent();
    }
    
    public String getFollowersCount() {
        return followersCount.textContent();
    }
    
    public String getFollowingCount() {
        return followingCount.textContent();
    }
    
    public String getGistsCount() {
        return gistsCount.textContent();
    }
}