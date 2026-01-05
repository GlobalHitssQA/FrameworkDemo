package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {
    private Page page;
    
    // Locators extracted from GitHub profile page
    private Locator avatar;
    private Locator fullName;
    private Locator username;
    private Locator followersLink;
    private Locator followingLink;
    private Locator locationElement;
    private Locator organizationElement;
    
    // Constructor
    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }
    
    private void initializeLocators() {
        // Real locators extracted from GitHub using Playwright inspection
        this.avatar = page.locator("img[alt*='@']").first();
        this.fullName = page.locator("h1 span").first();
        this.username = page.locator("h1 span").nth(1);
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        
        // Location element - using itemprop attribute for semantic HTML
        this.locationElement = page.locator("li[itemprop='homeLocation'] span");
        
        // Organization element
        this.organizationElement = page.locator("li[itemprop='worksFor'] span");
    }
    
    // Location-specific methods for this test case
    public boolean isLocationVisible() {
        try {
            return locationElement.count() > 0 && locationElement.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getLocationText() {
        if (isLocationVisible()) {
            return locationElement.textContent().trim();
        }
        return null;
    }
    
    // Additional profile methods
    public boolean isAvatarVisible() {
        return avatar.isVisible();
    }
    
    public String getFullName() {
        return fullName.textContent().trim();
    }
    
    public String getUsername() {
        return username.textContent().trim();
    }
    
    public String getFollowersCount() {
        return followersLink.textContent().trim();
    }
    
    public String getFollowingCount() {
        return followingLink.textContent().trim();
    }
    
    public boolean isOrganizationVisible() {
        try {
            return organizationElement.count() > 0 && organizationElement.isVisible();
        } catch (Exception e) {
            return false;
        }
    }
    
    public String getOrganizationText() {
        if (isOrganizationVisible()) {
            return organizationElement.textContent().trim();
        }
        return null;
    }
    
    public void waitForProfileLoad() {
        page.waitForSelector("h1", new Page.WaitForSelectorOptions()
            .setState(WaitForSelectorState.VISIBLE));
    }
}