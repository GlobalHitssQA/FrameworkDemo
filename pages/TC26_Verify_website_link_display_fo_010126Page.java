package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

public class GitHubProfilePage {

    private Page page;

    // Locators - REALES (extraídos con Playwright MCP)
    private static final String BASE_URL = "https://github.com";

    // User profile section locators
    private Locator avatar;
    private Locator fullName;
    private Locator username;
    private Locator followersLink;
    private Locator followingLink;
    private Locator organizationItem;
    private Locator locationItem;
    private Locator websiteLink;
    private Locator userInfoSection;
    private Locator followButton;
    private Locator profileNavigation;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Avatar - real locator from GitHub profile
        this.avatar = page.locator("a[href*='avatars.githubusercontent.com'] img");

        // Full name - extracted from h1 heading structure
        this.fullName = page.locator("h1 span.p-name, h1 span[itemprop='name']").first();

        // Username - extracted from h1 heading structure
        this.username = page.locator("h1 span.p-nickname, h1 span[itemprop='additionalName']").first();

        // Followers link - real locator
        this.followersLink = page.locator("a[href$='tab=followers']");

        // Following link - real locator
        this.followingLink = page.locator("a[href$='tab=following']");

        // Organization item - listitem with Organization label
        this.organizationItem = page.locator("li[itemprop='worksFor'], ul li:has(svg[class*='octicon-organization'])");

        // Location item - listitem with Home location label
        this.locationItem = page.locator("li[itemprop='homeLocation'], ul li:has(svg[class*='octicon-location'])");

        // Website link - the actual link element inside the list
        this.websiteLink = page.locator("ul li:has(svg[class*='octicon-link']) a[href]");

        // User info section - main profile sidebar
        this.userInfoSection = page.locator("div.js-profile-editable-area, div[itemtype*='Person']").first();

        // Follow button
        this.followButton = page.locator("a:has-text('Follow'), button:has-text('Follow')").first();

        // Profile navigation
        this.profileNavigation = page.locator("nav[aria-label='User profile']");
    }

    public void navigateToGitHub() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public boolean isPageLoaded() {
        return page.url().contains("github.com");
    }

    public boolean isProfileLoaded() {
        return profileNavigation.isVisible() || avatar.isVisible();
    }

    public boolean isUserInfoSectionVisible() {
        // Check if the profile section with user details is visible
        return avatar.isVisible() && (fullName.isVisible() || username.isVisible());
    }

    public boolean isWebsiteLinkVisible() {
        try {
            return websiteLink.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getWebsiteLinkText() {
        if (isWebsiteLinkVisible()) {
            return websiteLink.textContent();
        }
        return null;
    }

    public String getWebsiteLinkHref() {
        if (isWebsiteLinkVisible()) {
            return websiteLink.getAttribute("href");
        }
        return null;
    }

    public boolean isFullNameVisible() {
        try {
            // Also check for the h1 structure directly
            Locator h1Name = page.locator("h1").first();
            return fullName.isVisible() || h1Name.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getFullName() {
        if (isFullNameVisible()) {
            return fullName.textContent();
        }
        return null;
    }

    public boolean isUsernameVisible() {
        try {
            return username.isVisible() || page.locator("h1").isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsername() {
        if (isUsernameVisible()) {
            return username.textContent();
        }
        return null;
    }

    public boolean isAvatarVisible() {
        return avatar.isVisible();
    }

    public boolean isFollowersCountVisible() {
        return followersLink.isVisible();
    }

    public String getFollowersCount() {
        if (isFollowersCountVisible()) {
            return followersLink.textContent();
        }
        return null;
    }

    public boolean isFollowingCountVisible() {
        return followingLink.isVisible();
    }

    public String getFollowingCount() {
        if (isFollowingCountVisible()) {
            return followingLink.textContent();
        }
        return null;
    }

    public boolean isLocationVisible() {
        try {
            return locationItem.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getLocation() {
        if (isLocationVisible()) {
            return locationItem.textContent();
        }
        return null;
    }

    public boolean isOrganizationVisible() {
        try {
            return organizationItem.isVisible();
        } catch (Exception e) {
            return false;
        }
    }

    public String getOrganization() {
        if (isOrganizationVisible()) {
            return organizationItem.textContent();
        }
        return null;
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }
}