package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Finder Application
 * Locators marked as [INFERIDO] are inferred based on best practices for the custom application
 * Locators marked as [REAL] were extracted from github.com using Playwright inspection
 */
public class GitHubProfilePage {

    private Page page;
    
    // Application URL - should be configured based on environment
    private static final String BASE_URL = "https://github.com";
    
    // [INFERIDO] Search component locators - custom application
    private Locator searchInput;
    private Locator searchButton;
    
    // [REAL] Profile section locators - extracted from github.com
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator company;
    private Locator websiteLink;
    private Locator followButton;
    
    // [INFERIDO] Fallback/Not available indicators
    private Locator notAvailableIndicator;
    
    // [REAL] Metrics locators - extracted from github.com
    private Locator followersCount;
    private Locator followingCount;
    private Locator repositoriesTab;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // [INFERIDO] Search component - custom application selectors
        this.searchInput = page.locator("[data-testid='search-input'], input[type='text'][placeholder*='user'], input[type='search'], #search-input");
        this.searchButton = page.locator("[data-testid='search-button'], button[type='submit'], button:has(svg), .search-button");
        
        // [REAL] Avatar - extracted from github.com profile page
        this.userAvatar = page.locator("img.avatar-user.width-full, img[alt*='full-sized avatar'], .avatar-user");
        
        // [REAL] Name and username - extracted from github.com
        this.fullName = page.locator(".vcard-fullname, .p-name, h1 span.p-name");
        this.username = page.locator(".vcard-username, .p-nickname, h1 span.p-nickname");
        
        // [REAL] Biography - extracted from github.com
        this.biography = page.locator(".user-profile-bio, .p-note, [data-bio-text]");
        
        // [REAL] Location - extracted from github.com using itemprop
        this.location = page.locator("[itemprop='homeLocation'], .vcard-detail:has([itemprop='homeLocation']), li:has-text('location')");
        
        // [REAL] Company/Organization - extracted from github.com using itemprop
        this.company = page.locator("[itemprop='worksFor'], .vcard-detail:has([itemprop='worksFor']), li:has-text('Organization')");
        
        // [REAL] Website link - extracted from github.com using itemprop
        this.websiteLink = page.locator("[itemprop='url'], a[rel='nofollow me'], .vcard-detail a[href^='http']");
        
        // [REAL] Follow button - extracted from github.com
        this.followButton = page.locator("a.btn:has-text('Follow'), button:has-text('Follow'), [data-testid='follow-button']");
        
        // [INFERIDO] Not available indicator - custom application
        this.notAvailableIndicator = page.locator(":text('No disponible'), :text('Not available'), :text('N/A'), .not-available");
        
        // [REAL] Metrics - extracted from github.com
        this.followersCount = page.locator("a[href*='tab=followers']");
        this.followingCount = page.locator("a[href*='tab=following']");
        this.repositoriesTab = page.locator("a[href*='tab=repositories']");
    }

    // Navigation methods
    public void navigateToApplication() {
        page.navigate(BASE_URL);
    }
    
    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
    }

    // Search methods [INFERIDO]
    public void searchForUser(String username) {
        searchInput.fill(username);
        searchButton.click();
    }
    
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }
    
    public void waitForProfileToLoad() {
        userAvatar.waitFor(new Locator.WaitForOptions().setState(WaitForSelectorState.VISIBLE).setTimeout(10000));
    }

    // Avatar methods [REAL]
    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }
    
    public String getAvatarSource() {
        return userAvatar.getAttribute("src");
    }

    // Name methods [REAL]
    public boolean isFullNameVisible() {
        return fullName.isVisible();
    }
    
    public String getFullName() {
        return fullName.textContent().trim();
    }
    
    public boolean isUsernameVisible() {
        return username.isVisible();
    }
    
    public String getUsername() {
        return username.textContent().trim();
    }

    // Biography methods [REAL]
    public boolean isBioSectionVisible() {
        return biography.isVisible() || notAvailableIndicator.isVisible();
    }
    
    public String getBioText() {
        if (biography.isVisible()) {
            return biography.textContent().trim();
        }
        return "";
    }

    // Location methods [REAL]
    public boolean isLocationSectionVisible() {
        return location.isVisible() || page.locator(":text('No disponible')").isVisible();
    }
    
    public String getLocationText() {
        if (location.isVisible()) {
            return location.textContent().trim();
        }
        return "No disponible";
    }

    // Company methods [REAL]
    public boolean isCompanySectionVisible() {
        return company.isVisible() || page.locator(":text('No disponible')").isVisible();
    }
    
    public String getCompanyText() {
        if (company.isVisible()) {
            return company.textContent().trim();
        }
        return "No disponible";
    }

    // Website methods [REAL]
    public boolean isWebsiteLinkVisible() {
        return websiteLink.isVisible();
    }
    
    public boolean isWebsiteLinkClickable() {
        return websiteLink.isEnabled();
    }
    
    public String getWebsiteUrl() {
        return websiteLink.getAttribute("href");
    }
    
    public boolean isWebsiteNotAvailableVisible() {
        return page.locator(".website-section :text('No disponible'), .website-section :text('Not available')").isVisible();
    }

    // Follow button methods [REAL]
    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }
    
    public boolean isFollowButtonEnabled() {
        return followButton.isEnabled();
    }
    
    public void clickFollowButton() {
        followButton.click();
    }

    // Metrics methods [REAL]
    public String getFollowersCount() {
        return followersCount.textContent().trim();
    }
    
    public String getFollowingCount() {
        return followingCount.textContent().trim();
    }
    
    public String getRepositoriesCount() {
        return repositoriesTab.textContent().trim();
    }
}