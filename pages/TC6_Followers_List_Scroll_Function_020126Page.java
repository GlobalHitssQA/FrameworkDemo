package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;

/**
 * Page Object for GitHub Profile Followers Page
 * Locators: REAL (extracted with Playwright from github.com)
 */
public class GitHubFollowersPage {

    private final Page page;
    private final String baseUrl = "https://github.com";

    // Locators - REAL (extracted from live GitHub page inspection)
    private final Locator profileAvatar;
    private final Locator profileFullName;
    private final Locator profileUsername;
    private final Locator followersLink;
    private final Locator followersContainer;
    private final Locator followerCards;
    private final Locator followerAvatars;
    private final Locator paginationContainer;
    private final Locator nextPageLink;
    private final Locator previousPageLink;

    public GitHubFollowersPage(Page page) {
        this.page = page;
        
        // Profile elements - REAL selectors from GitHub
        this.profileAvatar = page.locator("img[alt*='full-sized avatar']");
        this.profileFullName = page.locator("h1 span.p-name");
        this.profileUsername = page.locator("h1 span.p-nickname");
        
        // Followers link - REAL selector
        this.followersLink = page.locator("a[href*='tab=followers']").first();
        
        // Followers list container - REAL selector from turbo-frame structure
        this.followersContainer = page.locator("turbo-frame#user-profile-frame > div.position-relative");
        
        // Individual follower cards - REAL selector
        this.followerCards = page.locator("turbo-frame#user-profile-frame div.d-table.table-fixed");
        
        // Follower avatars within cards - REAL selector
        this.followerAvatars = page.locator("turbo-frame#user-profile-frame img.avatar-user[alt^='@']");
        
        // Pagination - REAL selectors
        this.paginationContainer = page.locator(".pagination");
        this.nextPageLink = page.locator(".pagination a[rel='next'], .pagination a:has-text('Next')");
        this.previousPageLink = page.locator(".pagination a:has-text('Previous')");
    }

    /**
     * Navigate to a GitHub user profile
     * @param username GitHub username
     */
    public void navigateToProfile(String username) {
        page.navigate(baseUrl + "/" + username);
        page.waitForLoadState();
    }

    /**
     * Check if the profile page has loaded successfully
     * @return true if profile is loaded
     */
    public boolean isProfileLoaded() {
        return profileAvatar.isVisible() || profileUsername.isVisible();
    }

    /**
     * Click on the followers link to navigate to followers tab
     */
    public void clickFollowersLink() {
        followersLink.click();
        page.waitForLoadState();
    }

    /**
     * Check if followers list is visible
     * @return true if followers list is displayed
     */
    public boolean isFollowersListVisible() {
        return followerCards.first().isVisible();
    }

    /**
     * Check if the followers container is present in the DOM
     * @return true if container exists
     */
    public boolean isFollowersContainerPresent() {
        return followersContainer.count() > 0;
    }

    /**
     * Get the count of visible follower cards
     * @return number of visible followers
     */
    public int getVisibleFollowersCount() {
        return followerCards.count();
    }

    /**
     * Get current vertical scroll position of the page
     * @return scroll position in pixels
     */
    public int getCurrentScrollPosition() {
        return (int) page.evaluate("() => window.scrollY");
    }

    /**
     * Scroll down within the followers list area
     */
    public void scrollDownFollowersList() {
        page.evaluate("() => window.scrollBy(0, 500)");
        page.waitForTimeout(300);
    }

    /**
     * Scroll to the bottom of the followers list
     */
    public void scrollToBottomOfFollowersList() {
        page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)");
        page.waitForTimeout(500);
    }

    /**
     * Scroll back to the top of the page
     */
    public void scrollToTopOfFollowersList() {
        page.evaluate("() => window.scrollTo(0, 0)");
        page.waitForTimeout(300);
    }

    /**
     * Check if pagination is visible on the page
     * @return true if pagination exists
     */
    public boolean isPaginationVisible() {
        return paginationContainer.isVisible();
    }

    /**
     * Check if next page link exists
     * @return true if next page link is present
     */
    public boolean isNextPageLinkPresent() {
        return nextPageLink.count() > 0;
    }

    /**
     * Click on the next page link in pagination
     */
    public void clickNextPage() {
        if (isNextPageLinkPresent()) {
            nextPageLink.click();
            page.waitForLoadState();
        }
    }

    /**
     * Check if previous page link exists
     * @return true if previous page link is present
     */
    public boolean isPreviousPageLinkPresent() {
        return previousPageLink.count() > 0;
    }

    /**
     * Click on the previous page link in pagination
     */
    public void clickPreviousPage() {
        if (isPreviousPageLinkPresent()) {
            previousPageLink.click();
            page.waitForLoadState();
        }
    }

    /**
     * Get the text content of followers count
     * @return followers count text
     */
    public String getFollowersCountText() {
        return followersLink.textContent().trim();
    }

    /**
     * Get profile full name
     * @return full name of the profile
     */
    public String getProfileFullName() {
        return profileFullName.textContent().trim();
    }

    /**
     * Get profile username
     * @return username of the profile
     */
    public String getProfileUsername() {
        return profileUsername.textContent().trim();
    }

    /**
     * Scroll to a specific follower card by index
     * @param index zero-based index of the follower card
     */
    public void scrollToFollowerCard(int index) {
        Locator card = followerCards.nth(index);
        if (card.count() > 0) {
            card.scrollIntoViewIfNeeded();
        }
    }

    /**
     * Check if a specific follower card is visible in the viewport
     * @param index zero-based index of the follower card
     * @return true if the card is visible
     */
    public boolean isFollowerCardVisible(int index) {
        Locator card = followerCards.nth(index);
        return card.count() > 0 && card.isVisible();
    }
}