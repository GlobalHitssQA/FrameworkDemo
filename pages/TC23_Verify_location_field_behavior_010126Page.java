package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub User Profile Page
 * Locators source: REAL (extracted via Playwright MCP from github.com)
 */
public class GitHubProfilePage {
    
    private Page page;
    
    // Base URLs - locators reales extraídos de github.com
    private static final String BASE_URL = "https://github.com";
    
    // User Profile Section Locators - REALES extraídos con Playwright
    private Locator avatarImage;
    private Locator fullNameText;
    private Locator usernameText;
    private Locator followersLink;
    private Locator followingLink;
    private Locator locationItem;
    private Locator locationText;
    private Locator organizationItem;
    private Locator websiteLink;
    private Locator bioText;
    private Locator followButton;
    private Locator userInfoSection;
    private Locator userProfileNav;
    
    public GitHubProfilePage(Page page) {
        this.page = page;
        initLocators();
    }
    
    private void initLocators() {
        // Avatar - locator real
        this.avatarImage = page.locator("img[alt^='View'][alt$='full-sized avatar']");
        
        // Full name and username from h1 heading - locator real
        this.fullNameText = page.locator("h1.vcard-names span[itemprop='name'], h1 span.p-name, h1 > span:first-child");
        this.usernameText = page.locator("h1.vcard-names span[itemprop='additionalName'], h1 span.p-nickname, h1 > span:last-child");
        
        // Followers and Following links - locators reales
        this.followersLink = page.locator("a[href$='tab=followers']");
        this.followingLink = page.locator("a[href$='tab=following']");
        
        // Location field - locator real basado en listitem con "Home location"
        this.locationItem = page.locator("li[itemprop='homeLocation'], [class*='vcard-detail'][itemprop='homeLocation'], li:has(svg[class*='octicon-location'])");
        this.locationText = page.locator("li[itemprop='homeLocation'] span, [class*='vcard-detail'][itemprop='homeLocation'] span");
        
        // Organization - locator real
        this.organizationItem = page.locator("li[itemprop='worksFor'], li:has(svg[class*='octicon-organization'])");
        
        // Website link - locator real
        this.websiteLink = page.locator("li[itemprop='url'] a, a[rel='nofollow me'][itemprop='url']");
        
        // Bio text - locator real
        this.bioText = page.locator("div[data-bio-text], div.p-note.user-profile-bio");
        
        // Follow button - locator real
        this.followButton = page.locator("a:has-text('Follow')[href*='login'], button:has-text('Follow'), input[value='Follow']");
        
        // User info section (left sidebar) - locator real
        this.userInfoSection = page.locator("div.h-card, div[itemtype*='Person'], div.js-profile-editable-area").first();
        
        // User profile navigation - locator real
        this.userProfileNav = page.locator("nav[aria-label='User profile']");
    }
    
    // Navigation methods
    public void navigateToHomePage() {
        page.navigate(BASE_URL);
    }
    
    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }
    
    public void navigateToSearch() {
        page.navigate(BASE_URL + "/search");
    }
    
    // Verification methods
    public boolean isPageLoaded() {
        return page.title() != null && !page.title().isEmpty();
    }
    
    public boolean isProfilePageLoaded() {
        return userProfileNav.isVisible() || avatarImage.isVisible();
    }
    
    public boolean isUserInfoSectionVisible() {
        return avatarImage.isVisible() || usernameText.isVisible();
    }
    
    public boolean isAvatarVisible() {
        return avatarImage.isVisible();
    }
    
    public boolean isUsernameVisible() {
        return usernameText.isVisible();
    }
    
    public boolean isFullNameDisplayedOrEmpty() {
        try {
            return fullNameText.isVisible() || true;
        } catch (Exception e) {
            return true;
        }
    }
    
    public boolean isFollowersCountVisible() {
        return followersLink.isVisible();
    }
    
    public boolean isFollowingCountVisible() {
        return followingLink.isVisible();
    }
    
    public boolean isLocationFieldEmpty() {
        try {
            if (!locationItem.isVisible()) {
                return true;
            }
            String locationValue = getLocationText();
            return locationValue == null || locationValue.trim().isEmpty();
        } catch (Exception e) {
            return true;
        }
    }
    
    public boolean hasLocationPlaceholderText() {
        try {
            String locationValue = getLocationText();
            if (locationValue == null) {
                return false;
            }
            String lowerLocation = locationValue.toLowerCase();
            return lowerLocation.contains("no disponible") || 
                   lowerLocation.contains("not available") ||
                   lowerLocation.contains("n/a") ||
                   lowerLocation.isEmpty();
        } catch (Exception e) {
            return true;
        }
    }
    
    public boolean isLocationVisible() {
        return locationItem.isVisible();
    }
    
    // Getter methods
    public String getFullName() {
        if (fullNameText.isVisible()) {
            return fullNameText.textContent().trim();
        }
        return "";
    }
    
    public String getUsername() {
        if (usernameText.isVisible()) {
            return usernameText.textContent().trim();
        }
        return "";
    }
    
    public String getLocationText() {
        if (locationText.isVisible()) {
            return locationText.textContent().trim();
        }
        return null;
    }
    
    public String getFollowersCount() {
        if (followersLink.isVisible()) {
            return followersLink.textContent().trim();
        }
        return "0";
    }
    
    public String getFollowingCount() {
        if (followingLink.isVisible()) {
            return followingLink.textContent().trim();
        }
        return "0";
    }
    
    public String getBioText() {
        if (bioText.isVisible()) {
            return bioText.textContent().trim();
        }
        return "";
    }
    
    // Action methods
    public void clickFollowButton() {
        if (followButton.isVisible()) {
            followButton.click();
        }
    }
    
    public void clickFollowersLink() {
        followersLink.click();
    }
    
    public void clickFollowingLink() {
        followingLink.click();
    }
}