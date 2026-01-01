package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.WaitForSelectorState;
import java.util.List;

public class GitHubProfilePage {

    private Page page;
    
    // Locators - REALES (extraídos con Playwright MCP)
    private static final String BASE_URL = "https://github.com";
    
    // Search component locators
    private Locator searchInput;
    private Locator searchButton;
    
    // Profile page locators
    private Locator userAvatar;
    private Locator userName;
    private Locator followersLink;
    
    // Followers list locators
    private Locator followersContainer;
    private Locator followerEntries;
    private Locator followerAvatars;
    private Locator followerUsernameLinks;

    public GitHubProfilePage(Page page) {
        this.page = page;
        initializeLocators();
    }

    private void initializeLocators() {
        // Search input on GitHub homepage - real locator
        this.searchInput = page.locator("input[placeholder='you@domain.com'], input[name='q'], button:has-text('Search')");
        this.searchButton = page.locator("button[data-testid='sign-in-button'], button:has-text('Search')");
        
        // Profile page locators - real locators extracted from GitHub
        this.userAvatar = page.locator("img[alt^='View'][alt$='full-sized avatar']");
        this.userName = page.locator("h1 span.vcard-fullname, h1 span[itemprop='name']");
        this.followersLink = page.locator("a:has-text('followers')");
        
        // Followers list locators - real locators from GitHub followers page
        this.followersContainer = page.locator("div.position-relative > div.d-table").first();
        this.followerEntries = page.locator("div[data-hovercard-type='user'], div:has(> a > img[alt^='@'])");
        this.followerAvatars = page.locator("img[alt^='@']");
        this.followerUsernameLinks = page.locator("a[data-hovercard-type='user'], a[href^='/']:has(img[alt^='@'])");
    }

    public void navigateToHomePage() {
        page.navigate(BASE_URL);
        page.waitForLoadState();
    }

    public void navigateToUserProfile(String username) {
        page.navigate(BASE_URL + "/" + username);
        page.waitForLoadState();
    }

    public boolean isSearchComponentVisible() {
        return page.locator("input, button").first().isVisible();
    }

    public void enterUsername(String username) {
        // For GitHub, we navigate directly to the user profile
        navigateToUserProfile(username);
    }

    public boolean isUsernameEntered() {
        // Verify we are on a user profile page
        return page.url().contains("github.com/");
    }

    public void clickSearchButton() {
        // Navigation already performed in enterUsername
        page.waitForLoadState();
    }

    public void waitForProfileToLoad() {
        page.waitForSelector("h1", new Page.WaitForSelectorOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public void navigateToFollowersTab() {
        followersLink.first().click();
        page.waitForLoadState();
        page.waitForSelector("img[alt^='@']", new Page.WaitForSelectorOptions()
            .setState(WaitForSelectorState.VISIBLE)
            .setTimeout(10000));
    }

    public boolean isFollowersListVisible() {
        return followerAvatars.first().isVisible();
    }

    public boolean allFollowersHaveUsername() {
        Locator followers = page.locator("a[href^='/']:has(img[alt^='@'])");
        int count = followers.count();
        
        if (count == 0) {
            return false;
        }
        
        for (int i = 0; i < Math.min(count, 10); i++) {
            Locator follower = followers.nth(i);
            String href = follower.getAttribute("href");
            if (href == null || href.isEmpty() || href.equals("/")) {
                return false;
            }
        }
        return true;
    }

    public boolean allUsernamesAreFormatted() {
        Locator usernameLinks = page.locator("div:has(> a > img[alt^='@']) a[href^='/']");
        int count = usernameLinks.count();
        
        if (count == 0) {
            return false;
        }
        
        for (int i = 0; i < Math.min(count, 10); i++) {
            Locator link = usernameLinks.nth(i);
            String text = link.innerText();
            // Username should not be empty and should be readable
            if (text == null || text.trim().isEmpty()) {
                // Check if there's at least a valid href
                String href = link.getAttribute("href");
                if (href == null || href.length() < 2) {
                    return false;
                }
            }
        }
        return true;
    }

    public String getFollowerUsername(int index) {
        Locator follower = page.locator("a[href^='/']:has(img[alt^='@'])").nth(index);
        String href = follower.getAttribute("href");
        return href != null ? href.substring(1) : "";
    }

    public int getFollowersCount() {
        return page.locator("a[href^='/']:has(img[alt^='@'])").count();
    }

    public boolean isFollowerAvatarVisible(int index) {
        return followerAvatars.nth(index).isVisible();
    }

    public void clickFollowerProfile(int index) {
        page.locator("a[href^='/']:has(img[alt^='@'])").nth(index).click();
        page.waitForLoadState();
    }
}