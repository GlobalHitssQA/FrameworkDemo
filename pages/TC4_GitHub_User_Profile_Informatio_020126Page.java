package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;

/**
 * Page Object for GitHub User Profile Page
 * Locators source: REAL (extracted using Playwright MCP from github.com)
 */
public class GitHubProfilePage {

    private Page page;
    
    // Locators - REAL (extracted from GitHub profile page)
    private Locator avatarImage;
    private Locator fullName;
    private Locator username;
    private Locator biography;
    private Locator location;
    private Locator organization;
    private Locator webLink;
    private Locator followButton;
    private Locator followersLink;
    private Locator followingLink;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Avatar image - located in the profile sidebar with alt text pattern
        this.avatarImage = page.locator("img[alt^='View'][alt$='full-sized avatar']");
        
        // Full name - inside h1 heading, first span/div with the display name
        this.fullName = page.locator("h1.vcard-names span.p-name, h1 span[itemprop='name']").first();
        
        // Username - inside h1 heading, the span with lighter text
        this.username = page.locator("h1.vcard-names span.p-nickname, h1 span[itemprop='additionalName']").first();
        
        // Biography - user bio text in profile
        this.biography = page.locator("div.p-note, div[data-bio-text]");
        
        // Location - list item with home location aria label
        this.location = page.locator("li[itemprop='homeLocation'], li[aria-label*='Home location']");
        
        // Organization/Company - list item with organization info
        this.organization = page.locator("li[itemprop='worksFor'], li[aria-label*='Organization']");
        
        // Personal web link - the blog/website link in profile
        this.webLink = page.locator("li[itemprop='url'] a, a[rel='nofollow me']");
        
        // Follow button - link with text 'Follow'
        this.followButton = page.locator("a:has-text('Follow'):not(:has-text('followers'))").first();
        
        // Followers link
        this.followersLink = page.locator("a[href$='tab=followers']");
        
        // Following link
        this.followingLink = page.locator("a[href$='tab=following']");
    }

    public void navigateToProfile(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState();
    }

    public boolean isProfilePageLoaded() {
        return page.url().contains("github.com/") && 
               avatarImage.isVisible();
    }

    public boolean isAvatarVisible() {
        return avatarImage.isVisible();
    }

    public String getAvatarSrc() {
        return avatarImage.getAttribute("src");
    }

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

    public boolean isBiographyVisibleIfPresent() {
        // Biography is optional, return true if visible or if element doesn't exist
        if (biography.count() > 0) {
            return biography.isVisible();
        }
        return true; // No bio element means user doesn't have a bio, which is valid
    }

    public String getBiography() {
        if (biography.count() > 0 && biography.isVisible()) {
            return biography.textContent().trim();
        }
        return "";
    }

    public boolean isLocationVisible() {
        return location.count() > 0 && location.isVisible();
    }

    public String getLocation() {
        if (isLocationVisible()) {
            return location.textContent().trim();
        }
        return "";
    }

    public boolean isOrganizationVisible() {
        return organization.count() > 0 && organization.isVisible();
    }

    public String getOrganization() {
        if (isOrganizationVisible()) {
            return organization.textContent().trim();
        }
        return "";
    }

    public boolean isWebLinkVisible() {
        return webLink.count() > 0 && webLink.isVisible();
    }

    public String getWebLinkHref() {
        if (isWebLinkVisible()) {
            return webLink.getAttribute("href");
        }
        return "";
    }

    public String getWebLinkText() {
        if (isWebLinkVisible()) {
            return webLink.textContent().trim();
        }
        return "";
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
    }

    public boolean isFollowersLinkVisible() {
        return followersLink.isVisible();
    }

    public String getFollowersCount() {
        if (isFollowersLinkVisible()) {
            return followersLink.textContent().trim();
        }
        return "";
    }

    public boolean isFollowingLinkVisible() {
        return followingLink.isVisible();
    }

    public String getFollowingCount() {
        if (isFollowingLinkVisible()) {
            return followingLink.textContent().trim();
        }
        return "";
    }
}

// Additional Page Object for Search functionality
class GitHubSearchPage {

    private Page page;
    
    // Locators - REAL (extracted from GitHub search page)
    private Locator searchInput;
    
    private static final String SEARCH_PAGE_URL = "https://github.com/search";
    private static final String BASE_URL = "https://github.com";

    public GitHubSearchPage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search input textbox on GitHub search page
        this.searchInput = page.getByRole(com.microsoft.playwright.options.AriaRole.TEXTBOX, 
            new Page.GetByRoleOptions().setName("Search GitHub"));
    }

    public void navigateToSearchPage() {
        page.navigate(SEARCH_PAGE_URL);
        page.waitForLoadState();
    }

    public void searchForUser(String username) {
        // Direct navigation to user profile as GitHub search requires authentication
        // for full functionality. This approach navigates directly to the user profile.
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public void fillSearchInput(String query) {
        searchInput.fill(query);
    }

    public void submitSearch() {
        searchInput.press("Enter");
    }

    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }
}