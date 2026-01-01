package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub User Profile Page
 * Locators extracted using Playwright MCP - REAL locators from github.com
 */
public class GitHubProfilePage {

    private Page page;
    private static final String BASE_URL = "https://github.com";

    // REAL locators extracted from GitHub profile page using Playwright
    private Locator userAvatar;
    private Locator fullName;
    private Locator username;
    private Locator followButton;
    private Locator followersLink;
    private Locator followingLink;
    private Locator userBio;
    private Locator userLocation;
    private Locator userOrganization;
    private Locator userWebsite;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Avatar - real locator: img.avatar-user with class "rounded-2"
        this.userAvatar = page.locator("img.avatar-user");
        
        // Full name - located inside h1 heading, first span element
        this.fullName = page.locator("h1.vcard-names span.p-name, h1 span.vcard-fullname").first();
        
        // Username - located inside h1 heading, second span element
        this.username = page.locator("h1.vcard-names span.p-nickname, h1 span.vcard-username").first();
        
        // Follow button - real class: "btn btn-block" within follow container
        // Multiple Follow buttons exist; the main one has class "btn btn-block"
        this.followButton = page.locator("a.btn.btn-block:has-text('Follow')").first();
        
        // Alternative Follow button selector for sidebar
        // this.followButton = page.locator(".follow a.btn:has-text('Follow')").first();
        
        // Followers link - real locator with href containing "followers"
        this.followersLink = page.locator("a[href*='tab=followers']");
        
        // Following link - real locator with href containing "following"
        this.followingLink = page.locator("a[href*='tab=following']");
        
        // User bio - typically in a div with class containing bio
        this.userBio = page.locator(".p-note.user-profile-bio, [data-bio-text]");
        
        // User location - from listitem with "Home location" label
        this.userLocation = page.locator("li[itemprop='homeLocation'] span, [aria-label*='Home location'] span");
        
        // User organization - link to organization
        this.userOrganization = page.locator("li[itemprop='worksFor'] a, [aria-label*='Organization'] a");
        
        // User website link
        this.userWebsite = page.locator("li[itemprop='url'] a, a[rel='nofollow me']");
    }

    public void navigateToProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public boolean isUsernameVisible() {
        // Check if any username-like element is visible on the page
        return page.locator("h1").isVisible();
    }

    public boolean isFollowButtonVisible() {
        // Check for any Follow button on the page
        return page.locator("a:has-text('Follow')").first().isVisible();
    }

    public String getFollowButtonText() {
        return page.locator("a:has-text('Follow')").first().textContent().trim();
    }

    public String getFollowButtonHref() {
        return page.locator("a:has-text('Follow')").first().getAttribute("href");
    }

    public void clickFollowButton() {
        page.locator("a:has-text('Follow')").first().click();
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

    public boolean isBioVisible() {
        return userBio.isVisible();
    }

    public String getBioText() {
        return userBio.textContent().trim();
    }

    public String getLocation() {
        return userLocation.textContent().trim();
    }

    public String getOrganization() {
        return userOrganization.textContent().trim();
    }

    public String getWebsiteUrl() {
        return userWebsite.getAttribute("href");
    }

    public void clickFollowersLink() {
        followersLink.click();
    }

    public void clickFollowingLink() {
        followingLink.click();
    }

    public String getCurrentUrl() {
        return page.url();
    }

    public void waitForPageLoad() {
        page.waitForLoadState();
    }
}