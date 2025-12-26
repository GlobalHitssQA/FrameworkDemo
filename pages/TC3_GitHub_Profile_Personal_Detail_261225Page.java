package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;

/**
 * Page Object for GitHub Profile Search and Profile Details
 * Locators extracted using Playwright MCP from live GitHub pages
 * Locator source: PLAYWRIGHT (real selectors)
 */
public class GitHubProfilePage {

    private final Page page;
    
    // Search Page Locators (real - extracted via Playwright)
    private final Locator searchInput;
    
    // Profile Page Locators (real - extracted via Playwright)
    private final Locator userAvatar;
    private final Locator profileFullName;
    private final Locator profileUsername;
    private final Locator biographyElement;
    private final Locator locationElement;
    private final Locator companyElement;
    private final Locator webLinkElement;
    private final Locator followButton;
    private final Locator followersLink;
    private final Locator followingLink;
    private final Locator repositoriesTab;
    
    // Search Results Locators (real - extracted via Playwright)
    private final Locator firstUserResultLink;

    private static final String GITHUB_SEARCH_URL = "https://github.com/search?type=users";

    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Search input - real selector from GitHub search page
        this.searchInput = page.locator("#query-builder-test");
        
        // Avatar - real selector with class from GitHub profile
        this.userAvatar = page.locator("img.avatar-user");
        
        // Profile heading with full name and username - using h1 structure
        this.profileFullName = page.locator("h1.vcard-names .p-name, h1 span[itemprop='name'], h1 .vcard-fullname").first();
        this.profileUsername = page.locator("h1.vcard-names .p-nickname, h1 span[itemprop='additionalName']").first();
        
        // Biography - real selector from GitHub profile
        this.biographyElement = page.locator(".user-profile-bio, .p-note.user-profile-bio");
        
        // Location - real selector using aria-label
        this.locationElement = page.locator("li[aria-label*='Home location'], [itemprop='homeLocation']");
        
        // Company/Organization - real selector using aria-label
        this.companyElement = page.locator("li[aria-label*='Organization'], [itemprop='worksFor']");
        
        // Web link - real selector for user website
        this.webLinkElement = page.locator("a[rel='nofollow me'], li[itemprop='url'] a");
        
        // Follow button - real selector from GitHub profile
        this.followButton = page.locator("a.btn.btn-sm:has-text('Follow'), .follow-button, input[name='commit'][value='Follow']").first();
        
        // Followers and Following links - real selectors
        this.followersLink = page.locator("a[href*='tab=followers']");
        this.followingLink = page.locator("a[href*='tab=following']");
        
        // Repositories tab - real selector from profile navigation
        this.repositoriesTab = page.locator("nav a[href*='tab=repositories']");
        
        // First user result in search - real selector
        this.firstUserResultLink = page.locator("div[data-testid='results-list'] a[href^='/'], .search-title a").first();
    }

    // Navigation methods
    public void navigateToSearchPage() {
        page.navigate(GITHUB_SEARCH_URL);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void navigateToUserProfile(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    // Search functionality
    public boolean isSearchInputVisible() {
        return searchInput.isVisible();
    }

    public boolean isSearchInputEnabled() {
        return searchInput.isEnabled();
    }

    public void enterSearchQuery(String query) {
        searchInput.fill(query);
    }

    public String getSearchInputValue() {
        return searchInput.inputValue();
    }

    public void submitSearch() {
        searchInput.press("Enter");
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void clickOnFirstUserResult() {
        firstUserResultLink.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    // Profile page validation methods
    public boolean isProfilePageLoaded() {
        return userAvatar.isVisible();
    }

    public boolean isAvatarVisible() {
        return userAvatar.isVisible();
    }

    public String getAvatarSrc() {
        return userAvatar.getAttribute("src");
    }

    public String getFullName() {
        if (profileFullName.isVisible()) {
            return profileFullName.textContent().trim();
        }
        return "";
    }

    public String getUsername() {
        if (profileUsername.isVisible()) {
            return profileUsername.textContent().trim();
        }
        // Fallback: get username from URL
        String url = page.url();
        return url.substring(url.lastIndexOf("/") + 1);
    }

    public boolean isBiographyElementPresent() {
        return biographyElement.count() > 0;
    }

    public String getBiography() {
        if (biographyElement.isVisible()) {
            return biographyElement.textContent().trim();
        }
        return "";
    }

    public boolean isLocationElementPresent() {
        return locationElement.count() > 0;
    }

    public String getLocation() {
        if (locationElement.isVisible()) {
            return locationElement.textContent().trim();
        }
        return "";
    }

    public boolean isCompanyElementPresent() {
        return companyElement.count() > 0;
    }

    public String getCompany() {
        if (companyElement.isVisible()) {
            return companyElement.textContent().trim();
        }
        return "";
    }

    public boolean isWebLinkElementPresent() {
        return webLinkElement.count() > 0;
    }

    public String getWebLink() {
        if (webLinkElement.isVisible()) {
            return webLinkElement.getAttribute("href");
        }
        return "";
    }

    public boolean isFollowButtonVisible() {
        return followButton.isVisible();
    }

    public void clickFollowButton() {
        followButton.click();
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

    public String getRepositoriesCount() {
        if (repositoriesTab.isVisible()) {
            Locator counter = repositoriesTab.locator(".Counter");
            if (counter.isVisible()) {
                return counter.textContent().trim();
            }
        }
        return "0";
    }
}