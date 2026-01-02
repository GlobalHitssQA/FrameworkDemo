package pages;

import com.microsoft.playwright.Page;
import com.microsoft.playwright.Locator;
import com.microsoft.playwright.options.LoadState;
import java.util.List;

public class GitHubProfilePage {
    private Page page;
    
    // Locators extraídos con Playwright desde la página real de GitHub
    private Locator profileAvatar;
    private Locator profileUsername;
    private Locator followersLink;
    private Locator followingLink;
    private Locator followersList;
    private Locator followerAvatars;
    private Locator followerLinks;
    private Locator profileHeading;
    private Locator followerEntries;

    public GitHubProfilePage(Page page) {
        this.page = page;
        
        // Locators reales extraídos de GitHub
        this.profileAvatar = page.locator("img[alt*='@']").first();
        this.profileUsername = page.locator("h1").first();
        this.followersLink = page.locator("a[href*='tab=followers']").first();
        this.followingLink = page.locator("a[href*='tab=following']").first();
        this.followersList = page.locator("main");
        this.followerAvatars = page.locator("img[alt^='@']");
        this.followerLinks = page.locator("a[href^='/']:not([href*='tab=']):not([href*='achievement'])");
        this.profileHeading = page.locator("h1");
        this.followerEntries = page.locator("main > div > div:nth-child(2) > div > div");
    }

    public void navigateToGitHub() {
        page.navigate("https://github.com");
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public void searchUsername(String username) {
        page.navigate("https://github.com/" + username);
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isProfileVisible() {
        return profileUsername.isVisible();
    }

    public boolean hasFollowers() {
        return followersLink.isVisible() && 
               followersLink.textContent().matches(".*\\d+.*followers.*");
    }

    public void clickFollowersLink() {
        followersLink.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isFollowersListVisible() {
        return followersList.isVisible() && 
               page.url().contains("tab=followers");
    }

    public boolean hasFollowerAvatars() {
        return followerAvatars.count() > 0;
    }

    public String getFirstFollowerUsername() {
        Locator firstFollowerLink = page.locator("a[href^='/'][href$='']:has(img[alt^='@'])").first();
        String href = firstFollowerLink.getAttribute("href");
        return href.replace("/", "");
    }

    public String getFirstFollowerProfileUrl() {
        Locator firstFollowerLink = page.locator("a[href^='/'][href$='']:has(img[alt^='@'])").first();
        return firstFollowerLink.getAttribute("href");
    }

    public void clickFirstFollowerLink() {
        Locator firstFollowerLink = page.locator("a[href^='/'][href$='']:has(img[alt^='@'])").first();
        firstFollowerLink.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }

    public boolean isProfilePageLoaded() {
        return profileHeading.isVisible() && 
               profileAvatar.isVisible();
    }

    public int getFollowersCount() {
        return Math.min(followerEntries.count(), 10);
    }

    public String getFollowerUsernameByIndex(int index) {
        Locator followerLink = followerEntries.nth(index).locator("a[href^='/'][href$='']:has(img[alt^='@'])").first();
        String href = followerLink.getAttribute("href");
        return href.replace("/", "");
    }

    public String getFollowerProfileUrlByIndex(int index) {
        Locator followerLink = followerEntries.nth(index).locator("a[href^='/'][href$='']:has(img[alt^='@'])").first();
        return followerLink.getAttribute("href");
    }

    public void clickFollowerLinkByIndex(int index) {
        Locator followerLink = followerEntries.nth(index).locator("a[href^='/'][href$='']:has(img[alt^='@'])").first();
        followerLink.click();
        page.waitForLoadState(LoadState.NETWORKIDLE);
    }
}